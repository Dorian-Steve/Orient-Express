// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { randomUUID } from "crypto";
// import { eq } from "drizzle-orm";
// import { AuthError, CredentialsSignin, type DefaultSession, type NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";

// import { db } from "@/lib/db/connection";
// import { account, session as sessionSchema, user, verificationToken } from "@/lib/db/schemas";
// import { verifyPassword } from "@/lib/utils/password";
// import { signInSchema } from "@/lib/validations/auth-validators";
// import { type UserId, type UserRole } from "@/types/user.types";

// /**
//  * Extended module augmentation for comprehensive session management
//  */
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       role: UserRole;
//       department?: string;
//       phoneNumber?: string;
//       bio?: string;
//       emailVerified: Date | null;
//     } & DefaultSession["user"];
//     expires: string;
//     sessionToken?: string;
//   }

//   interface User {
//     role: UserRole;
//     department: string;
//     phoneNumber?: string;
//     bio?: string;
//     emailVerified: Date | null;
//   }
// }

// /**
//  * Create adapter with custom session creation for credentials
//  */
// const adapter = DrizzleAdapter(db, {
//   usersTable: user,
//   accountsTable: account,
//   sessionsTable: sessionSchema,
//   verificationTokensTable: verificationToken,
// });

// // Override the adapter to handle credentials sessions
// const enhancedAdapter = {
//   ...adapter,
//   async createSession(session: { sessionToken: string; userId: string; expires: Date }) {
//     console.log("Creating session:", session);
//     const result = await adapter.createSession!(session);
//     return result;
//   },
// };

// class NotVerifiedError extends CredentialsSignin {
//   code = "EMAIL_NOT_VERIFIED";
// }

// /**
//  * Enhanced NextAuth configuration with manual session creation for credentials
//  */
// export const authConfig = {
//   providers: [
//     Google({
//       allowDangerousEmailAccountLinking: true,
//     }),
//     GitHub({
//       allowDangerousEmailAccountLinking: true,
//     }),
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const { email, password } = await signInSchema.parseAsync(credentials);

//           const userData = await db.query.user.findFirst({
//             where: (user, { eq }) => eq(user.email, email),
//             with: {
//               accounts: true,
//             },
//           });

//           if (!userData) {
//             return null;
//           }

//           if (!userData.accounts[0]?.password) {
//             return null;
//           }

//           const isPasswordValid = await verifyPassword({
//             password: password,
//             hash: userData.accounts[0].password,
//           });

//           if (!isPasswordValid) {
//             return null;
//           }

//           return {
//             id: userData.id,
//             email: userData.email,
//             name: userData.name,
//             role: userData.role as UserRole,
//             image: userData.image,
//             department: userData.department,
//             phoneNumber: userData.phoneNumber ?? undefined,
//             emailVerified: userData.emailVerified,
//             bio: userData.bio ?? undefined,
//           };
//         } catch (error) {
//           console.error("Authorization error:", error);
//           if (error instanceof AuthError) {
//             throw error;
//           }
//           return null;
//         }
//       },
//     }),
//   ],
//   adapter: enhancedAdapter,
//   session: {
//     strategy: "jwt" as const, // Use JWT for credentials, database for OAuth
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//   },
//   jwt: {
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//   },
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       // For credentials provider, manually create a database session
//       if (account?.provider === "credentials" && user.id) {
//         try {
//           console.log("Creating manual session for credentials user:", user.id);

//           // Generate session token
//           const sessionToken = randomUUID();
//           const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000); // 30 days

//           // Create session in database manually
//           await enhancedAdapter.createSession({
//             sessionToken,
//             userId: user.id,
//             expires,
//           });

//           console.log("Manual session created successfully");
//         } catch (error) {
//           console.error("Error creating manual session:", error);
//           return false;
//         }
//       }

//       // Additional validation
//       if (account?.provider === "credentials" && !user.emailVerified) {
//         return false;
//       }

//       return true;
//     },
//     async jwt({ token, user, account, profile, session, trigger }) {
//       // Initial sign in
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//         token.department = user.department;
//         token.phoneNumber = user.phoneNumber;
//         token.bio = user.bio;
//         token.emailVerified = user.emailVerified;
//       }

//       // Refresh user data on update or periodically
//       if (
//         trigger === "update" ||
//         (token.id && Date.now() - (token.iat ?? 0) * 1000 > 60 * 60 * 1000)
//       ) {
//         try {
//           const freshUser = await db.query.user.findFirst({
//             where: (user, { eq }) => eq(user.id, token.id as UserId),
//           });

//           if (freshUser) {
//             token.role = freshUser.role as UserRole;
//             token.department = freshUser.department;
//             token.phoneNumber = freshUser.phoneNumber;
//             token.bio = freshUser.bio;
//             token.emailVerified = freshUser.emailVerified;
//             token.name = freshUser.name;
//             token.email = freshUser.email;
//             token.picture = freshUser.image;
//           }
//         } catch (error) {
//           console.error("Error refreshing user data:", error);
//         }
//       }

//       return token;
//     },
//     async session({ session, token, user }) {
//       if (session?.user && token) {
//         session.user.id = token.id as UserId;
//         session.user.role = token.role as UserRole;
//         session.user.department = token.department as string;
//         session.user.phoneNumber = token.phoneNumber as string | undefined;
//         session.user.bio = token.bio as string | undefined;
//         session.user.emailVerified = token.emailVerified as Date | null;
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
//     async signIn({ user, account, profile, isNewUser }) {
//       console.log("User signed in:", {
//         userId: user.id,
//         provider: account?.provider,
//         isNewUser,
//       });
//     },
//     async signOut(params) {
//       // Handle union type properly - params can be { session } or { token }
//       const session = "session" in params ? params.session : null;
//       const token = "token" in params ? params.token : null;

//       // For credentials users, manually clean up database session
//       if (token?.id) {
//         try {
//           // Find and delete sessions for this user
//           const userSessions = await db.query.session.findMany({
//             where: (sessionTable, { eq, and, gt }) =>
//               and(
//                 eq(sessionTable.userId, token.id as UserId),
//                 gt(sessionTable.expires, new Date()),
//               ),
//           });

//           if (userSessions.length > 0) {
//             await db.delete(sessionSchema).where(eq(sessionSchema.userId, token.id as UserId));
//             console.log("Cleaned up manual sessions for user:", token.id);
//           }
//         } catch (error) {
//           console.error("Error cleaning up sessions:", error);
//         }
//       }

//       console.log("User signed out:", {
//         userId: (session?.userId as UserId) ?? token?.id,
//       });
//     },
//     async createUser({ user }) {
//       console.log("New user created:", { userId: user.id });
//     },
//   },
//   pages: {
//     signIn: "/auth/sign-in",
//     signOut: "/auth/sign-out",
//     error: "/auth/error",
//     verifyRequest: "/auth/verify-request",
//   },
//   cookies: {
//     sessionToken: {
//       name: "talent-bridge-session-token",
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//       },
//     },
//     callbackUrl: {
//       name: "talent-bridge-callback-url",
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//       },
//     },
//     csrfToken: {
//       name: "talent-bridge-csrf-token",
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
