import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import UserModel from "@/models/user"
import { FriendRequest } from "@/types"
import { connectMongoDB } from "@/lib/db"

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Unauthorized", { status: 400 })

    await connectMongoDB()

    const senderUserId: string = await req.json()

    // Check if a friend request from the session user already exists
    const existingReceiver = await UserModel.findById(senderUserId)
    if (!existingReceiver) {
      return NextResponse.json({
        success: false,
        message: "Not found receiver",
      })
    }

    const existingRequest = existingReceiver.friendRequests.find(
      (req) => req.senderId === session.user._id
    )

    if (existingRequest) {
      return NextResponse.json(
        {
          success: false,
          message: "Friend request already exists",
        },
        { status: 400 }
      )
    }

    const newFriendRequest: FriendRequest = {
      senderId: session.user._id,
      senderImage: session.user.image,
      senderName: session.user.name,
    }

    const receiver = await UserModel.findOneAndUpdate(
      { _id: senderUserId },
      { $push: { friendRequests: newFriendRequest } }
    )

    if (!receiver)
      return NextResponse.json({
        success: false,
        message: "Not found receiver",
      })

    return NextResponse.json(
      { success: true, newFriendRequest },
      { status: 200 }
    )
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    )
  }
}
