// src/types/next-auth.d.ts
// This file augments the NextAuth.js types to include custom fields.
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client"; // Import UserRole from your Prisma client

// Extend the default NextAuth.js User type
declare module "next-auth" {
  interface User extends DefaultUser {
    // Add your custom fields here that are returned by the `authorize` callback
    // and stored in the database by the adapter.
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    schoolId?: string | null;
    role?: UserRole; // Use your Prisma UserRole enum type
  }

  // Extend the default session.user type
  interface Session extends DefaultSession {
    user: {
      id: string; // Ensure id is always present
      email?: string | null; // Ensure email is also present
      firstName?: string | null;
      lastName?: string | null;
      imageUrl?: string | null;
      schoolId?: string | null;
      role?: UserRole; // Use your Prisma UserRole enum type
    } & DefaultSession["user"]; // Keep existing properties
  }
}

// Extend the default JWT type
declare module "next-auth/jwt" {
  interface JWT {
    // Add your custom fields here that are stored in the JWT.
    id: string; // Ensure id is always present
    email?: string | null; // Ensure email is also present
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    schoolId?: string | null;
    role?: UserRole; // Use your Prisma UserRole enum type
  }
}
