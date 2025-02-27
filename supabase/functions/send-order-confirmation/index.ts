
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY') || '')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { orderId } = await req.json()

    // Create Supabase client avec la clé de service (pour éviter les problèmes RLS)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch order details
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', orderId)
      .single()

    if (orderError) throw orderError
    if (!order) throw new Error('Order not found')

    // Fetch email template
    const { data: template, error: templateError } = await supabaseAdmin
      .from('email_templates')
      .select()
      .eq('name', 'order_confirmation')
      .single()

    if (templateError) throw templateError

    // Replace template variables
    let htmlContent = template.html_content
      .replace('{{orderId}}', order.id.slice(0, 8))
      .replace('{{total}}', order.total.toFixed(2))
      .replace('{{orderDate}}', new Date(order.created_at).toLocaleDateString('fr-FR'))
      .replace('{{status}}', order.status)
      .replace('{{firstName}}', order.first_name)
      .replace('{{lastName}}', order.last_name)
      .replace('{{address}}', order.address)
      .replace('{{postalCode}}', order.postal_code)
      .replace('{{city}}', order.city)

    // Send email
    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: 'Finely <order@finely.com>',
      to: order.email,
      subject: template.subject,
      html: htmlContent,
    })

    if (emailError) throw emailError

    // Log email sending
    const { error: logError } = await supabaseAdmin
      .from('email_logs')
      .insert({
        order_id: orderId,
        template_name: 'order_confirmation',
        status: 'sent'
      })

    if (logError) throw logError

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error:', error)

    // Log error if orderId was provided
    const requestBody = await req.json().catch(() => ({}));
    if (requestBody.orderId) {
      const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      await supabaseAdmin
        .from('email_logs')
        .insert({
          order_id: requestBody.orderId,
          template_name: 'order_confirmation',
          status: 'error',
          error_message: error.message
        })
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
