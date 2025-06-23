import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      
      // In a real app, you would:
      // 1. Get the user ID from session.metadata.userId
      // 2. Get the credits from session.metadata.credits
      // 3. Update the user's credit balance in your database
      // 4. Send a confirmation email
      
      console.log('Payment successful:', {
        userId: session.metadata?.userId,
        credits: session.metadata?.credits,
        amount: session.amount_total,
      })
      break
      
    case 'payment_intent.succeeded':
      console.log('Payment succeeded:', event.data.object)
      break
      
    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data.object)
      break
      
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
} 