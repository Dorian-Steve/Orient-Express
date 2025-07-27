// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client"; // Adjust path if needed

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole | "STUDENT" | "ADVISOR" | "ADMIN"; // Merge both role definitions
      schoolId?: string; // Optional because backup-auth didn’t include it
      firstName?: string | null;
      lastName?: string | null;
      imageUrl?: string | null;
      profileCompleted?: boolean;
      emailVerified?: Date | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: UserRole | "STUDENT" | "ADVISOR" | "ADMIN";
    schoolId?: string;
    passwordHash?: string | null;
    emailVerified?: Date | null;
    name?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    profileCompleted?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole | "STUDENT" | "ADVISOR" | "ADMIN";
    schoolId?: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    profileCompleted?: boolean;
    emailVerified?: Date | null;
  }
}
