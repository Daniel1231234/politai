import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth"
import { connectMongoDB } from "@/lib/db"
import UserModel from "@/models/user"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        if (credentials == null) return null
        const { email, password } = credentials as {
          email: string
          password: string
        }

        await connectMongoDB()

        const user = await UserModel.findOne({ email })
        if (!user) throw Error("email/password mismatch!")
        const passwordsMatch = await user.comparePassword(password)
        if (!passwordsMatch) throw Error("email/password mismatch!")

        return {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        } as unknown as any
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      try {
        if (user && user.role) {
          token.role = user.role
          token._id = user._id
        }
        return token
      } catch (error) {
        console.error("JWT callback error:", error)
        return Promise.reject(new Error("JWT callback error"))
      }
    },
    async session({ session, token, user }: any) {
      try {
        if (token.role) {
          session.user.role = token.role
          session.user._id = token._id
        } else {
          const dbUser = await UserModel.findOne({ email: session.user.email })
          if (dbUser) {
            session.user._id = dbUser._id.toString()
            session.user.role = dbUser.role
          }
        }
        return session
      } catch (error) {
        console.error("Session callback error:", error)
        return Promise.reject(new Error("Session callback error"))
      }
    },
    async signIn({ user, account, profile, email }: any) {
      try {
        if (account.provider === "google") {
          await connectMongoDB()
          const existUser = await UserModel.findOne({ email: profile.email })
          if (!existUser) {
            const newUser = await UserModel.create({
              email: profile.email,
              name: profile.name,
              image: profile.picture,
              password: "justToPassLogin",
              active: true,
            })
            return true
          }
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
