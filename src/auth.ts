// src/auth.ts
import NextAuth, { type Session, type User } from "next-auth";
import type { JWT } from "next-auth/jwt";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// IMPORTANT: Use EmailProvider, not ResendProvider directly from next-auth/providers
import EmailProvider from "next-auth/providers/email";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/server/db";
import { compare } from "bcryptjs";

import { Resend } from 'resend'; // Import the Resend SDK

const resend = new Resend(process.env.AUTH_RESEND_API_KEY);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
    }),

    // Use EmailProvider for magic link, and integrate Resend SDK here
    EmailProvider({
      server: {
        // This 'server' object is usually for Nodemailer SMTP.
        // For Resend, we override the `sendVerificationRequest` function.
        // However, NextAuth.js still expects this object to be present.
        // You can put dummy values or null if not strictly used by your custom send function.
        host: process.env.EMAIL_SERVER_HOST || "smtp.resend.com", // Example, can be dummy
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587"), // Example, can be dummy
        auth: {
          user: process.env.EMAIL_SERVER_USER || process.env.EMAIL_FROM, // Example, can be dummy
          pass: process.env.EMAIL_SERVER_PASSWORD || process.env.AUTH_RESEND_API_KEY, // Example, can be dummy
        },
      },
      from: process.env.EMAIL_FROM!, // This is the 'from' address for your emails

      // Override the default sendVerificationRequest to use Resend
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        try {
          await resend.emails.send({
            from: provider.from as string, // Use the 'from' address configured in the provider
            to: email,
            subject: 'Verify your email address for Orient Express',
            html: `
              <p>Hello,</p>
              <p>Thank you for registering with Orient Express. Please verify your email address by clicking the link below:</p>
              <p><a href="${url}">Verify Email Address</a></p>
              <p>If you did not register for an account, please ignore this email.</p>
              <p>This link will expire soon.</p>
              <p>Best regards,</p>
              <p>The Orient Express Team</p>
            `,
            text: `Hello,\n\nThank you for registering with Orient Express. Please verify your email address by visiting this link: ${url}\n\nIf you did not register for an account, please ignore this email.\n\nBest regards,\nThe Orient Express Team`,
          });
          console.log(`Verification email sent to ${email} via Resend`);
        } catch (error) {
          console.error(`Failed to send verification email to ${email} via Resend:`, error);
          throw new Error('Failed to send verification email.');
        }
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
          throw new Error("Invalid input: Email and password are required.");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.passwordHash) {
          throw new Error("Invalid email or password");
        }

        const isValid = await compare(credentials.password, user.passwordHash);

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          image: user.imageUrl,
          role: user.role,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/auth/verify-request",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role; // Cast to any to access custom properties
        token.schoolId = (user as any).schoolId;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        token.imageUrl = (user as any).imageUrl;
        token.emailVerified = (user as any).emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.schoolId = token.schoolId as any;
        session.user.firstName = token.firstName as any;
        session.user.lastName = token.lastName as any;
        session.user.imageUrl = token.imageUrl as any;
        session.user.emailVerified = token.emailVerified as any;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
