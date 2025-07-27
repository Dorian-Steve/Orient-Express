// import { type NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "./prisma"
// import bcrypt from "bcryptjs"
// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"

// export const { handlers, auth, signIn, signOut, session } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers:[
//     Google({
//     authorization: {
//       params: {
//         prompt: "consent",
//         access_type: "offline",
//         response_type: "code",
//       },
//     },
//   })
// ],
// callbacks: {
//     async signIn({ account, profile }) {
//       if (account.provider === "google") {
//         return profile.email_verified && profile.email.endsWith("@example.com")
//       }
//       return true // Do different verification for other providers that don't have `email_verified`
//     },
//   },
// })
// // export const authOptions: NextAuthOptions = {
// //   adapter: PrismaAdapter(prisma),
// //   providers: [
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID!,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// //     }),
// //     GitHubProvider({
// //       clientId: process.env.GITHUB_CLIENT_ID!,
// //       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
// //     }),
// //     CredentialsProvider({
// //       name: "credentials",
// //       credentials: {
// //         email: { label: "Email", type: "email" },
// //         password: { label: "Password", type: "password" }
// //       },
// //       async authorize(credentials) {
// //         if (!credentials?.email || !credentials?.password) {
// //           return null
// //         }

// //         const user = await prisma.user.findUnique({
// //           where: { email: credentials.email }
// //         })

// //         if (!user || !user.password) {
// //           return null
// //         }

// //         const isValid = await bcrypt.compare(credentials.password, user.password)
        
// //         if (!isValid) {
// //           return null
// //         }

// //         return {
// //           id: user.id,
// //           email: user.email,
// //           name: user.name,
// //           image: user.image,
// //         }
// //       }
// //     })
// //   ],
// //   session: {
// //     strategy: "jwt",
// //     maxAge: 7 * 24 * 60 * 60, // 7 days
// //   },
// //   pages: {
// //     signIn: "/auth/sign-in",
// //     signUp: "/auth/sign-up",
// //   },
// //   callbacks: {
// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.id = user.id
// //       }
// //       return token
// //     },
// //     async session({ session, token }) {
// //       if (token) {
// //         session.user.id = token.id as string
// //       }
// //       return session
// //     },
// //   },
// // }