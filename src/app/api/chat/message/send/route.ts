import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/db"
import { generateRandomId } from "@/lib/utils"
import ChatModel from "@/models/chat"
import { pusherServer } from "@/lib/pusher"

export const POST = async (req: Request) => {
  try {
    await connectMongoDB()
    const session = await getServerSession(authOptions)
    if (!session)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    const body = await req.json()

    const message = {
      id: generateRandomId(),
      chatId: body.chatId,
      sender: session.user,
      content: body.content,
      createdAt: Date.now(),
    }

    await Promise.all([
      pusherServer.trigger(body.chatId, "incoming-message", message),
      ChatModel.findOneAndUpdate(
        { chatId: body.chatId },
        {
          $push: { messages: message },
        }
      ),
    ])

    return NextResponse.json({ success: true, message })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, error: "Something went wrong!" },
      { status: 500 }
    )
  }
}
