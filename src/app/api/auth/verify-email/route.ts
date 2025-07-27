// src/app/api/auth/verify-email/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust path to your Prisma client

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    // Redirect to an error page or show a message
    return NextResponse.redirect(new URL('/auth/error?message=No+verification+token+provided', request.url));
  }

  try {
    // Find the verification token in the database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token: token },
    });

    // Check if token exists and is not expired
    if (!verificationToken || verificationToken.expires < new Date()) {
      return NextResponse.redirect(new URL('/auth/error?message=Invalid+or+expired+verification+link', request.url));
    }

    // Find the user associated with the token's identifier (email)
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return NextResponse.redirect(new URL('/auth/error?message=User+not+found', request.url));
    }

    // Update the user's emailVerified status
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    // Delete the used verification token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    // Redirect to a success page
    return NextResponse.redirect(new URL('/auth/verification-success', request.url));

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.redirect(new URL('/auth/error?message=Verification+failed', request.url));
  }
}