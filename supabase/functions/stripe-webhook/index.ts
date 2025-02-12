
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.18.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      throw new Error('No signature found in request');
    }

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Log the webhook event
    const { data: webhookEvent, error: webhookError } = await supabaseClient
      .from('stripe_webhook_events')
      .insert({
        stripe_event_id: event.id,
        type: event.type,
        payload: event,
      })
      .select()
      .single();

    if (webhookError) {
      throw new Error(`Error logging webhook event: ${webhookError.message}`);
    }

    try {
      // Process the event based on its type
      switch (event.type) {
        case 'payment_intent.succeeded':
          await handlePaymentIntentSucceeded(event.data.object, supabaseClient);
          break;
        case 'payment_intent.payment_failed':
          await handlePaymentIntentFailed(event.data.object, supabaseClient);
          break;
        // Add more event types as needed
      }

      // Log successful processing
      await supabaseClient
        .from('webhook_logs')
        .insert({
          webhook_event_id: webhookEvent.id,
          status: 'success',
        });

      // Update webhook event status
      await supabaseClient
        .from('stripe_webhook_events')
        .update({ 
          status: 'processed',
          processed_at: new Date().toISOString()
        })
        .eq('id', webhookEvent.id);

    } catch (processError: any) {
      // Log processing error
      await supabaseClient
        .from('webhook_logs')
        .insert({
          webhook_event_id: webhookEvent.id,
          status: 'error',
          error_details: processError.message
        });

      // Update webhook event status
      await supabaseClient
        .from('stripe_webhook_events')
        .update({ 
          status: 'failed',
          error_message: processError.message,
          processed_at: new Date().toISOString()
        })
        .eq('id', webhookEvent.id);

      throw processError;
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err: any) {
    console.error('Error processing webhook:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent, supabase: any) {
  const { metadata } = paymentIntent;
  if (!metadata?.orderId) {
    throw new Error('No order ID found in payment intent metadata');
  }

  // Update order status
  const { error: orderError } = await supabase
    .from('orders')
    .update({ 
      status: 'completed',
      payment_date: new Date().toISOString(),
      stripe_payment_intent_id: paymentIntent.id
    })
    .eq('id', metadata.orderId);

  if (orderError) {
    throw new Error(`Error updating order: ${orderError.message}`);
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent, supabase: any) {
  const { metadata } = paymentIntent;
  if (!metadata?.orderId) {
    throw new Error('No order ID found in payment intent metadata');
  }

  // Update order status
  const { error: orderError } = await supabase
    .from('orders')
    .update({ 
      status: 'failed',
      error_message: paymentIntent.last_payment_error?.message || 'Payment failed',
      stripe_payment_intent_id: paymentIntent.id
    })
    .eq('id', metadata.orderId);

  if (orderError) {
    throw new Error(`Error updating order: ${orderError.message}`);
  }
}
