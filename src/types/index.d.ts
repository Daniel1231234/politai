export interface FriendRequest {
  senderId: string
  senderImage: string
  senderName: string
}

declare module "next-auth" {
  interface User {
    name: string
    email: string
    image: string
    role: "admin" | "user"
    _id: any
  }

  interface Session {
    user: User & {
      _id: string
    }
  }
}
