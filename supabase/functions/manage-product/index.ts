
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

    const { name, description, price, image } = await req.json()

    // Create product in Stripe
    const stripeProduct = await stripe.products.create({
      name,
      description,
      images: [image],
    })

    // Create price in Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(price * 100), // Convert to cents
      currency: 'eur',
    })

    // Store product in database
    const { data: product, error } = await supabaseClient
      .from('products')
      .insert({
        name,
        description,
        price,
        image,
        stripe_product_id: stripeProduct.id,
        stripe_price_id: stripePrice.id,
      })
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify(product),
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
