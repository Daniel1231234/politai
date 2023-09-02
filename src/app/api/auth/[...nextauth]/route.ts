import type { NextAuthOptions } from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth"
import { connectMongoDB } from "@/lib/db"
import UserModel from "@/models/user"
import clientPromise from "@/lib/clientPromise"

export const authOptios: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
        console.log("why its here?")
        if (credentials == null) return null
        const { email, password } = credentials as {
          email: string
          password: string
        }

        await connectMongoDB()

        const user = await UserModel.findOneAndUpdate(
          { email },
          { active: true }
        )
        if (!user) throw Error("email/password mismatch!")
        const passwordsMatch = await user.comparePassword(password)
        if (!passwordsMatch) throw Error("email/password mismatch!")

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        }
      }
      // if (user && user.role) {
      //   token.role = user.role
      //   token.id = user._id
      // }
      return token
    },
    async session({ session, token, user }: any) {
      if (token) {
        session.user = token.user
      }
      return session

      // if (!token.role) {
      //   const dbUser = await UserModel.findOne({ email: session.user.email })
      //   if (dbUser) {
      //     session.user._id = dbUser._id.toString()
      //     session.user.role = dbUser.role
      //     return session
      //   }
      // }

      // if (session.user) {
      //   session.user.role = token.role
      //   session.user._id = token.id
      // }
      // return session
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
            console.log("newUswr = > ", newUser)
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

const handler = NextAuth(authOptios)

export { handler as GET, handler as POST }
