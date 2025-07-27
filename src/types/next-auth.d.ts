// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "STUDENT" | "ADVISOR" | "ADMIN"; // Assuming UserRole is correctly mapped
      schoolId: string;
      firstName?: string | null;
      lastName?: string | null;
      imageUrl?: string | null;
      emailVerified?: Date | null; // Ensure this matches your Prisma User model
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // From Prisma User model
    role: "STUDENT" | "ADVISOR" | "ADMIN"; // From Prisma User model
    schoolId: string; // From Prisma User model
    passwordHash?: string | null; // From Prisma User model
    emailVerified?: Date | null; // From Prisma User model
    name?: string | null; // From Prisma User model (added for OAuth compatibility)
    firstName?: string | null; // From Prisma User model
    lastName?: string | null; // From Prisma User model
    imageUrl?: string | null; // From Prisma User model
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "STUDENT" | "ADVISOR" | "ADMIN";
    schoolId: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    emailVerified?: Date | null; // Ensure this matches your Prisma User model
    // Default JWT properties like 'name', 'email', 'picture', 'sub' are already handled by DefaultJWT
  }
}
