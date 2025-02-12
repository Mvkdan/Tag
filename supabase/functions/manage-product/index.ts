
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

    const { stripe_price_id } = await req.json()

    // Fetch price details from Stripe
    const price = await stripe.prices.retrieve(stripe_price_id, {
      expand: ['product']
    })

    if (!price.product || typeof price.product === 'string') {
      throw new Error('Invalid price data from Stripe')
    }

    // Store product in database
    const { data: product, error } = await supabaseClient
      .from('products')
      .insert({
        name: price.product.name,
        description: price.product.description,
        price: price.unit_amount ? price.unit_amount / 100 : 0, // Convert from cents to euros
        image: price.product.images?.[0] || '',
        stripe_product_id: price.product.id,
        stripe_price_id: price.id,
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
