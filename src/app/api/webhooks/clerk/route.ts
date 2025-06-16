import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  console.log('Webhook received') // Debug log
  
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is missing')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing Svix headers')
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  const payload = await req.json()
  console.log('Webhook payload:', JSON.stringify(payload, null, 2)) // Debug log

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
    console.log('Verified event:', evt.type) // Debug log
  } catch (err) {
    console.error('Verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    // Handle user events
    if (evt.type === 'user.created' || evt.type === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data
      const email = email_addresses?.[0]?.email_address

      if (!email) {
        console.error('No email address found')
        return NextResponse.json({ error: 'No email provided' }, { status: 400 })
      }

      console.log('Upserting user:', { id, email }) // Debug log
      
      const user = await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email,
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
        },
        create: {
          clerkId: id,
          email,
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
          role: 'STUDENT', // Default role
        },
      })

      console.log('User processed:', user.id) // Debug log
    }
    else if (evt.type === 'user.deleted') {
      const { id } = evt.data
      console.log('Deleting user:', id) // Debug log
      await prisma.user.delete({ where: { clerkId: id } })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Database operation failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}