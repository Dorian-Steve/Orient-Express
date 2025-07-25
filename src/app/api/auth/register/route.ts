// src/app/api/auth/register/route.ts (Example custom registration route)
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust path to your Prisma client
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/lib/email'; // Your email utility
import crypto from 'crypto'; // For generating secure tokens

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, schoolId } = await request.json();

    if (!email || !password || !firstName || !lastName || !schoolId) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10); // 10 is a good salt rounds value

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        schoolId,
        role: "STUDENT", // Default role
        // emailVerified will be null initially
      },
    });

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token valid for 24 hours

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verificationToken,
        expires: expires,
      },
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({ message: 'Registration successful! Please check your email to verify your account.' }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'An error occurred during registration.' }, { status: 500 });
  }
}
