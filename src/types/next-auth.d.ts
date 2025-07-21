// src/types/next-auth.d.ts
import { DefaultSession, DefaultJWT, DefaultUser } from "next-auth";
// Assuming UserRole is defined in your Prisma client or a shared types file
import { UserRole } from "@prisma/client"; // Or adjust path to your UserRole enum definition

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      imageUrl?: string | null;
      role?: UserRole;
      profileCompleted?: boolean;
      // You can also include default NextAuth.js properties if needed:
      // name?: string | null;
      // email?: string | null;
      // image?: string | null;
    } & DefaultSession["user"]; // Augment existing properties
  }

  interface JWT extends DefaultJWT {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    role?: UserRole;
    profileCompleted?: boolean;
  }

  interface User extends DefaultUser {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    role?: UserRole;
    profileCompleted?: boolean;
    // Ensure this matches what you return from the authorize callback
    // e.g., if you return 'name' and 'image' directly, ensure they are here too
  }
}