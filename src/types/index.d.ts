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
  chats: Chat[]
  opinions: string[]
  friends: string[]
  ideology: string
  role: "admin" | "user"
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
  creator: string
}

export type Chat = {
  _id: string
  chatId: string
  messages: any[]
  users: string[] | User[]
}

export interface Message {
  id: string
  chatId: string
  sender: User
  content: string
  createdAt: number
}
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
      _id: any
    }
  }
}
