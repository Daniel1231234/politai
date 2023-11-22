import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id?: any
    name: string
    email: string
    image: string
    role: "admin" | "user"
    _id: any
  }

  interface Session {
    user: User & {
      _id: string
      role: "admin" | "user"
      provider: string
    }
    token: {
      _id: string
      role: "admin" | "user"
      provider: string
    }
  }
}
