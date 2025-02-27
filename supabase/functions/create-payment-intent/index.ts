
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13.10.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Utilisation de la clé de service pour contourner les restrictions RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { amount, order_data, origin } = await req.json()

    if (!origin) {
      throw new Error('Origin URL is required')
    }

    const { items, ...orderDataWithoutItems } = order_data;

    // Create the order in pending state
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert([{
        ...orderDataWithoutItems,
        status: 'pending',
      }])
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      throw new Error(`Order creation failed: ${orderError.message}`)
    }

    // Get products from database to get their Stripe price IDs
    const { data: products, error: productsError } = await supabaseAdmin
      .from('products')
      .select('id, stripe_price_id')
      .in('id', items.map((item: any) => item.product_id))

    if (productsError) {
      console.error('Products fetch error:', productsError)
      throw new Error(`Products fetch failed: ${productsError.message}`)
    }

    if (!products || products.length === 0) {
      throw new Error('No valid products found for the items in cart')
    }

    // Create a map of product IDs to Stripe price IDs
    const priceIdMap = products.reduce((acc: any, product: any) => {
      acc[product.id] = product.stripe_price_id
      return acc
    }, {})

    // Check if all products have stripe_price_id
    const missingPriceIds = items.filter((item: any) => !priceIdMap[item.product_id])
    if (missingPriceIds.length > 0) {
      throw new Error(`Missing Stripe price IDs for some products: ${missingPriceIds.map((i: any) => i.product_id).join(', ')}`)
    }

    // Create order items
    if (items && items.length > 0) {
      const { error: itemsError } = await supabaseAdmin
        .from('order_items')
        .insert(
          items.map((item: any) => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            image: item.image
          }))
        )

      if (itemsError) {
        console.error('Order items creation error:', itemsError)
        throw new Error(`Order items creation failed: ${itemsError.message}`)
      }
    }

    // Create Stripe Checkout Session using price IDs
    const lineItems = items.map((item: any) => ({
      price: priceIdMap[item.product_id],
      quantity: item.quantity,
    }));
    
    console.log('Creating Stripe session with line items:', lineItems);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/orders/${order.id}?success=true`,
      cancel_url: `${origin}/checkout?canceled=true`,
      metadata: {
        order_id: order.id,
      },
    })

    // Update order with Stripe session ID
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id)

    if (updateError) {
      console.error('Order update error:', updateError)
      throw new Error(`Order update failed: ${updateError.message}`)
    }

    return new Response(
      JSON.stringify({
        sessionUrl: session.url,
        orderId: order.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in create-payment-intent:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
