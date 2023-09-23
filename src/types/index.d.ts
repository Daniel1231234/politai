export interface FriendRequest {
  senderId: string
  senderImage: string
  senderName: string
}

export interface Like {
  _id: string
  creator: User | string
  opinion: Opinion | string
  createdAt: number
}

export interface Opinion {
  _id: string
  title: string
  body: string
  images: string[]
  topics: string[]
  creator: User | string
  comments: Comment[]
  likes: Like[]
  dislikes: Like[]
  createdAt: Date | number
}

export interface Comment {
  _id: string
  text: string
  creator: User | string
  opinion: string
  likes: Like[]
  dislikes: Like[]
  createdAt: number
}

export interface Chat {
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
