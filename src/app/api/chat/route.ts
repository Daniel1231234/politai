import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import { connectMongoDB } from "@/lib/db"
import ChatModel from "@/models/chat"
import UserModel from "@/models/user"

export const POST = async (req: Request) => {
  await connectMongoDB()
  try {

    const { chatId, user, friend } = await req.json()
    let chat = await ChatModel.findOne({ chatId }).exec()

    if (!chat) {
      chat = await ChatModel.create({
        chatId,
        messages: [],
        users: [user, friend],
      })

      console.log("chat from route => ", chat)

      const updates = [
        UserModel.findByIdAndUpdate(
          user._id,
          { $push: { chats: chat._id } },
          { new: true }
        ),
        UserModel.findByIdAndUpdate(
          friend._id,
          { $push: { chats: chat._id } },
          { new: true }
        ),
      ]

      await Promise.all(updates)
    }

    return NextResponse.json({ success: true, data: chat })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false })
  }
}
