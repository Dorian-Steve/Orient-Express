// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github"; // Example, you can remove if not needed
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple"; // For iCloud/Apple Sign In
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // For hashing/comparing passwords with CredentialsProvider

// Initialize Prisma Client
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // Configure Prisma as the database adapter for NextAuth.js
  // This will manage your User, Account, Session, and VerificationToken models
  adapter: PrismaAdapter(prisma),

  // Configure authentication providers
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID!,
    //   clientSecret: {
    //     generate: async () => {
    //       return "dummy_apple_client_secret";
    //     },
    //   },
    //   // Optional: Redirect URI for Apple, ensure it's registered in Apple Developer Portal
    //   // redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/apple`,
    // }),
    // Credentials Provider (for email/password login)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // No credentials provided
        }

        // Find user by email in your Prisma database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If user not found or no password hash stored (e.g., OAuth user)
        if (!user || !user.passwordHash) {
          return null;
        }

        // Compare provided password with hashed password in the database
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          return null; // Invalid password
        }

        // If credentials are valid, return the user object
        // The 'id' field is crucial for NextAuth.js to link to your User model
        return {
          id: user.id.toString(), // Convert Int ID to String as NextAuth.js expects string IDs in the JWT/Session
          email: user.email,
          name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          image: user.imageUrl,
          role: user.role, 
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],

  // Configure session management
  session: {
    strategy: "jwt", // Use JWT for session management
    maxAge: 7 * 24 * 60 * 60, // 7 days (example)
    // Optional: Update session every X seconds
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // Custom pages for authentication flow
  pages: {
    signIn: "/auth/sign-in", // Your custom sign-in page
    signOut: "/auth/sign-out", // Your custom sign-out page
    error: "/auth/error", // Error page
    verifyRequest: "/auth/verify-request", // For email verification (magic link)
    // newUser: "/auth/new-user", // If you have a custom new user flow
  },

  // Callbacks to customize JWT and session
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // 'user' is only available on the first sign in or when using credentials provider
      if (user) {
        token.id = user.id; // Store your database user ID in the JWT
        token.role = (user as any).role; // Cast to any to access custom properties
        token.emailVerified = (user as any).emailVerified;
        // Assign the user's image URL to the JWT token's picture field
        // 'user.imageUrl' comes from your Prisma User model
        token.picture = user.imageUrl;
      }
      // If you need to store provider-specific data
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom properties from JWT to the session
      if (token) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).emailVerified = token.emailVerified;
        // Assign the picture from the JWT token to the session user's image field
        (session.user as any).image = token.picture;
      }
      return session;
    },
  },

  // Optional: Events for logging or custom actions
  events: {
    async signIn(message) { /* on successful sign in */ },
    async signOut(message) { /* on sign out */ },
    async createUser(message) { /* user created */ },
    async updateUser(message) { /* user updated */ },
    async linkAccount(message) { /* account linked to a user */ },
    async session(message) { /* session created */ },
  },

  // Optional: Debug mode for development
  debug: process.env.NODE_ENV === "development",
};

// Export the NextAuth handler for Next.js API routes
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

