import { Account, Profile } from "next-auth"

export interface Err {
  error: string
  [key: string]: any
}

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

export interface ExtendedProfile extends Profile {
  picture?: string
  role?: string
}

export interface SignInWithOauthParams {
  account: Account
  profile: ExtendedProfile
}

export interface GetUserByEmailParams {
  email: string
}

export interface SignInWithCredentialsParams {
  email: string
  password: string
}

export interface UpdateUserProfileParams {
  name: string
}

export interface SignUpWithCredentialsParams {
  name: string
  email: string
  password: string
}

export interface ChangeUserPasswordParams {
  oldPassword: string
  newPassword: string
}
