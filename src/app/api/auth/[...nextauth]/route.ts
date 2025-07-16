import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { createClient } from '@supabase/supabase-js'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABBASE_SERVICE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL) {
    throw new Error('Missing NeXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!SUPABBASE_SERVICE_KEY) {
    throw new Error('Missing NeXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

const supabase = createClient(SUPABASE_URL || "", SUPABBASE_SERVICE_KEY || "")

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID || "",
            clientSecret: GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ profile, account }) {
            if (!profile?.email) {
                throw new Error('No profile')
            }

            const { data: existingUser, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('email', profile.email)
                .single()

            if (fetchError && fetchError.code !== 'PGRST116') {
                throw new Error('Database error: ' + fetchError.message)
            }

            if (existingUser) {
                const { error: updateError } = await supabase
                    .from('users')
                    .update({
                        name: profile.name,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('email', profile.email)

                if (updateError) {
                    throw new Error('Failed to update user: ' + updateError.message)
                }
            } else {
                const { error: insertError } = await supabase
                    .from('users')
                    .insert({
                        email: profile.email,
                        name: profile.name,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    })

                if (insertError) {
                    throw new Error('Failed to create user: ' + insertError.message)
                }
            }

            return true
        },
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id as string
            }
            return session
        },
        async jwt({ token, user, account, profile }) {
            if (profile) {
                const { data: user, error } = await supabase
                    .from('users')
                    .select('id')
                    .eq('email', profile.email)
                    .single()

                if (error) {
                    throw new Error('No user found: ' + error.message)
                }

                if (user) {
                    token.id = user.id
                }
            }
            return token
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }