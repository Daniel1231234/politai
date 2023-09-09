export type DBUser = {
  createdAt?: string
  _id: string
  email: string
  name: string
  password: string
  active: boolean
  phone: string
  image: string
  birthday: string
  friendRequests: string[]
  gender: string
  opinions: string[]
  friends: string[]
  ideology: string
  role: string
  __v: number
}

export type FriendRequest = {
  senderId: string
  senderImage: string
  senderName: string
}

export type UploadImagesResult = {
  info: {
    public_id: string
  }
  event: "success"
}

export type Like = {
  id: string
  creator: any
}

export type Chat = {
  _id: string
  chatId: string
  messages: any[]
  users: DBUser[]
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
      _id: any
    }
  }
}
