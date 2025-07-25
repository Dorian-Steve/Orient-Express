// src/lib/auth.ts
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient here
import bcrypt from "bcryptjs";
import EmailProvider from "next-auth/providers/email";


const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM
  }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // No credentials provided
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If no user found or user has no passwordHash (e.g., signed up via OAuth)
        if (!user || !user.passwordHash) {
          return null;
        }

        // Compare provided password with hashed password from DB
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.passwordHash, // CRITICAL FIX: Compare against passwordHash
        );

        if (!isValidPassword) {
          return null; // Invalid password
        }

        // Return the user object. NextAuth.js expects at least 'id'.
        // We include other fields that will be propagated to the JWT and session.
        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName, // Custom field
          lastName: user.lastName,   // Custom field
          imageUrl: user.imageUrl,   // Custom field
          schoolId: user.schoolId,   // Custom field
          role: user.role,           // Custom field
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: "/sign-in", // Adjusted path if your sign-in page is directly under /sign-in
    // signUp: "/sign-up", // NextAuth.js doesn't have a built-in signUp page, this is usually custom
    error: "/auth/error", // Example error page
  },
  callbacks: {
    async jwt({ token, user }) {
      // 'user' is only present on the first sign-in (after authorize) or when updating session
      if (user) {
        // Explicitly cast user to the type that includes your custom fields
        const customUser = user as typeof user & {
          firstName?: string;
          lastName?: string;
          imageUrl?: string;
          schoolId?: string;
          role?: string; // Or your UserRole enum type
        };

        token.id = customUser.id;
        token.email = customUser.email;
        token.firstName = customUser.firstName;
        token.lastName = customUser.lastName;
        token.imageUrl = customUser.imageUrl;
        token.schoolId = customUser.schoolId;
        token.role = customUser.role; // Add role to token
      }
      return token;
    },
    
    async session({ session, token }) {
      // 'token' now contains the custom fields from the jwt callback
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email; // Ensure email is also propagated
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.imageUrl = token.imageUrl;
        session.user.schoolId = token.schoolId;
        session.user.role = token.role; // Add role to session
      }
      return session;
    },
  },
};
