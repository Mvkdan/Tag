
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
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { headers: { Authorization: authHeader } },
      }
    )

    const { amount, order_data, origin } = await req.json()

    if (!origin) {
      throw new Error('Origin URL is required')
    }

    const { items, ...orderDataWithoutItems } = order_data;

    // Create the order in pending state
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert([{
        ...orderDataWithoutItems,
        status: 'pending',
      }])
      .select()
      .single()

    if (orderError) throw orderError

    // Get products from database to get their Stripe price IDs
    const { data: products, error: productsError } = await supabaseClient
      .from('products')
      .select('id, stripe_price_id')
      .in('id', items.map((item: any) => item.product_id))

    if (productsError) throw productsError

    // Create a map of product IDs to Stripe price IDs
    const priceIdMap = products.reduce((acc: any, product: any) => {
      acc[product.id] = product.stripe_price_id
      return acc
    }, {})

    // Create order items
    if (items && items.length > 0) {
      const { error: itemsError } = await supabaseClient
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

      if (itemsError) throw itemsError
    }

    // Create Stripe Checkout Session using price IDs
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price: priceIdMap[item.product_id],
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/orders/${order.id}?success=true`,
      cancel_url: `${origin}/checkout?canceled=true`,
      metadata: {
        order_id: order.id,
      },
    })

    // Update order with Stripe session ID
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id)

    if (updateError) throw updateError

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
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
