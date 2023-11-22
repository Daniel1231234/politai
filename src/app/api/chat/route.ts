import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import ChatModel from "@/models/chat"
import UserModel from "@/models/user"
import connectDB from "@/lib/mongodb"

export const POST = async (req: Request) => {
  await connectDB()
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ success: false })
    const { user } = session

    const { chatId, friend } = await req.json()
    let chat = await ChatModel.findOne({ chatId })

    if (!chat) {
      chat = await ChatModel.create({
        chatId,
        messages: [],
        users: [user, friend],
      })

      const updates = [
        UserModel.findByIdAndUpdate(user._id, { $push: { chats: chat._id } }),
        UserModel.findByIdAndUpdate(friend._id, { $push: { chats: chat._id } }),
      ]

      await Promise.all(updates)
    }

    return NextResponse.json({ success: true, data: chat })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false })
  }
}
