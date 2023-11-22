import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth"
import {
  getUserByEmail,
  signInWithCredentials,
  signInWithOauth,
} from "@/actions/authActions"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth", // app/signin
    error: "/error", // app/error
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await signInWithCredentials({
          email: credentials?.email,
          password: credentials?.password,
        })

        return user
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.type === "oauth" && profile) {
        return await signInWithOauth({ account, profile })
      }
      return true
    },
    async jwt({ token, trigger, session }) {
      try {
        if (trigger === "update") {
          token.name = session.name
        } else {
          if (token.email) {
            const user = await getUserByEmail({ email: token.email })
            if (user) {
              token.name = user.name
              token._id = user._id
              token.role = user.role
              token.provider = user.provider
            }
          }
        }
        return token
      } catch (error) {
        return Promise.reject(new Error("JWT callback error"))
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          _id: token._id,
          role: token.role,
          provider: token.provider,
        },
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
