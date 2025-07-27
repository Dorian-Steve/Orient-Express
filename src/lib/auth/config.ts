// // src/lib/auth.ts
// import { randomUUID } from "crypto"; // Still useful for generating tokens if needed, but less so with PrismaAdapter
// import { AuthError, type DefaultSession, type NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter"; // Import PrismaAdapter
// import { db } from "@/server/db"; // Import your Prisma client instance (from prisma-db-singleton Canvas)
// import bcrypt from "bcryptjs"; // For password verification
// import { signInSchema } from "@/lib/auth/auth-validators"; // Assuming this path is correct
// import { type UserRole, type UserId } from "@prisma/client"; // Import UserRole from Prisma client

// /**
//  * Extended module augmentation for comprehensive session management
//  * This part is typically in src/types/next-auth.d.ts, but included here for context.
//  * It will be provided in a separate immersive below.
//  */
// // declare module "next-auth" { ... }

// /**
//  * Enhanced NextAuth configuration with Prisma Adapter
//  */
// export const authConfig = {
//   // Use PrismaAdapter with your Prisma client instance
//   adapter: PrismaAdapter(db), // 'db' is your PrismaClient instance from "@/server/db"

//   providers: [
//     Google({
//       allowDangerousEmailAccountLinking: true,
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const { email, password } = await signInSchema.parseAsync(credentials);

//           // Use Prisma to find the user
//           const userData = await db.user.findUnique({
//             where: { email: email },
//             // Include related models if necessary, like accounts for OAuth users
//             // For credentials, we mainly need passwordHash from the User model itself
//           });

//           if (!userData) {
//             return null; // User not found
//           }

//           // Verify password for credentials login
//           // Assuming passwordHash is directly on the User model as per prisma-schema-final
//           if (!userData.passwordHash) {
//             // User exists but doesn't have a password hash (e.g., signed up via OAuth)
//             return null;
//           }

//           const isPasswordValid = await bcrypt.compare(
//             password,
//             userData.passwordHash,
//           );

//           if (!isPasswordValid) {
//             return null; // Invalid password
//           }

//           // Return the user object. NextAuth.js expects at least 'id'.
//           // Include other fields that will be propagated to the JWT and session.
//           return {
//             id: userData.id,
//             email: userData.email,
//             name: userData.firstName + " " + userData.lastName, // Combine for 'name' if needed
//             image: userData.imageUrl,
//             role: userData.role, // From Prisma User model
//             // Add other fields from User model that you want in the session
//             // Note: department, phoneNumber, bio, emailVerified are NOT directly on User in prisma-schema-final
//             // They are on StudentProfile/AdvisorProfile.
//             // If you need them in session.user, you'll need to fetch them here
//             // and include them in the returned object, then augment types.
//             // For now, I'm only including fields directly on the User model.
//             // If you need profile-specific data, you'd fetch it here:
//             // studentProfile: await db.studentProfile.findUnique({ where: { userId: userData.id } }),
//             // advisorProfile: await db.advisorProfile.findUnique({ where: { userId: userData.id } }),
//           };
//         } catch (error) {
//           console.error("Authorization error:", error);
//           // Re-throw AuthError if it's a specific authentication error
//           if (error instanceof AuthError) {
//             throw error;
//           }
//           return null; // For other unexpected errors
//         }
//       },
//     }),
//   ],
//   // adapter is set above: adapter: PrismaAdapter(db),
//   session: {
//     strategy: "jwt", // Use JWT for session management
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//   },
//   jwt: {
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//   },
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       // PrismaAdapter handles session creation for all providers automatically.
//       // No manual session creation for credentials needed here.

//       // Additional validation: check emailVerified if it's a field on your User model
//       // Note: emailVerified is not directly on User in prisma-schema-final.
//       // If you need this, you'd add it to your User model in Prisma schema.
//       // For now, commenting out as it's not in your current User model.
//       // if (account?.provider === "credentials" && !user.emailVerified) {
//       //   return false; // Prevent sign-in if email not verified
//       // }

//       return true; // Allow sign-in
//     },
//     async jwt({ token, user, trigger }) {
//       // 'user' is only present on the first sign-in (after authorize) or when updating session
//       if (user) {
//         // Map common fields from User to JWT token
//         token.id = user.id;
//         token.email = user.email;
//         token.name = user.name; // This would be combined firstName/lastName
//         token.picture = user.image; // Maps to imageUrl

//         // Add custom fields from your User model to the token
//         token.role = user.role;
//         // If you need firstName, lastName separately in token:
//         token.firstName = (user as any).firstName;
//         token.lastName = (user as any).lastName;
//         token.schoolId = (user as any).schoolId;
//       }

//       // Refresh user data on update or periodically (e.g., every hour)
//       // This ensures the token has the latest user data from the DB
//       if (
//         trigger === "update" ||
//         (token.id && Date.now() - (token.iat ?? 0) * 1000 > 60 * 60 * 1000)
//       ) {
//         try {
//           const freshUser = await db.user.findUnique({
//             where: { id: token.id as string },
//             // Include related profiles if you need their data in the session
//             // For example, to get 'speciality' or 'academicBackground' for students:
//             include: {
//               studentProfile: true,
//               advisorProfile: true,
//               adminProfile: true,
//             },
//           });

//           if (freshUser) {
//             // Update token with fresh data
//             token.email = freshUser.email;
//             token.name = freshUser.firstName + " " + freshUser.lastName;
//             token.picture = freshUser.imageUrl;
//             token.role = freshUser.role;
//             token.firstName = freshUser.firstName;
//             token.lastName = freshUser.lastName;
//             token.schoolId = freshUser.schoolId;

//             // Add profile-specific data to token based on role
//             if (freshUser.role === "STUDENT" && freshUser.studentProfile) {
//               token.speciality = freshUser.studentProfile.speciality;
//               token.academicBackground = freshUser.studentProfile.academicBackground;
//               // Add other studentProfile fields as needed
//             } else if (freshUser.role === "ADVISOR" && freshUser.advisorProfile) {
//               token.bio = freshUser.advisorProfile.bio;
//               // Add other advisorProfile fields as needed
//             }
//             // Add adminProfile fields if necessary
//           }
//         } catch (error) {
//           console.error("Error refreshing user data in JWT:", error);
//         }
//       }

//       return token;
//     },
//     async session({ session, token, user }) {
//       // Propagate custom fields from JWT token to session.user
//       if (session?.user && token) {
//         session.user.id = token.id as string;
//         session.user.email = token.email;
//         session.user.name = token.name;
//         session.user.image = token.picture;

//         // Propagate custom fields
//         session.user.role = token.role as UserRole;
//         session.user.firstName = token.firstName as string | null | undefined;
//         session.user.lastName = token.lastName as string | null | undefined;
//         session.user.schoolId = token.schoolId as string | null | undefined;

//         // Propagate profile-specific fields if they exist on the token
//         session.user.speciality = (token as any).speciality;
//         session.user.academicBackground = (token as any).academicBackground;
//         session.user.bio = (token as any).bio;
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       // Redirect logic after sign in/out
//       if (url.startsWith("/")) return `${baseUrl}${url}`;
//       else if (new URL(url).origin === baseUrl) return url;
//       return baseUrl;
//     },
//   },
//   events: {
//     async signIn({ user, account, isNewUser }) {
//       console.log("User signed in:", {
//         userId: user.id,
//         provider: account?.provider,
//         isNewUser,
//       });
//       // PrismaAdapter handles  database operations for sign-in,
//       // so no manual session/user creation needed here.
//     },
//     async signOut(params) {
//       // PrismaAdapter handles session deletion automatically for database-backed sessions.
//       // No manual session cleanup needed here for credentials or OAuth.
//       const userId = ("session" in params && params.session?.user?.id) || ("token" in params && params.token?.id);
//       console.log("User signed out:", { userId });
//     },
//     async createUser({ user }) {
//       console.log("New user created:", { userId: user.id });
//       // PrismaAdapter handles user creation.
//     },
//   },
//   pages: {
//     signIn: "/sign-in", // Corrected path to match Next.js App Router convention
//     // signOut: "/auth/sign-out", // NextAuth.js doesn't have a built-in signOut page
//     error: "/auth/error",
//     // verifyRequest: "/auth/verify-request", // Only if using email provider
//   },
//   cookies: {
//     sessionToken: {
//       name: "orient-express-session-token", // Renamed cookie for your project
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//       },
//     },
//     callbackUrl: {
//       name: "orient-express-callback-url", // Renamed cookie
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//       },
//     },
//     csrfToken: {
//       name: "orient-express-csrf-token", // Renamed cookie
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//       },
//     },
//   },
//   debug: process.env.NODE_ENV === "development",
// } satisfies NextAuthConfig;
