import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import UserModel from "../../../../models/user"
import connectDB from "@/lib/mongodb"

interface Props {
  params: {
    action: "accept" | "deny"
  }
}

export const POST = async (req: Request, { params }: Props) => {
  try {
    const session = await getServerSession(authOptions)

    await connectDB()

    if (!session) return new Response("Unauthorized", { status: 400 })

    const { senderId } = await req.json()

    const commonUpdate = {
      $pull: { friendRequests: { senderId } }, // Remove friend request for both accept and deny
    }

    if (params.action === "accept") {
      const senderUpdate = {
        ...commonUpdate,
        $push: { friends: session.user._id },
      }

      const receiverUpdate = {
        ...commonUpdate,
        $push: { friends: senderId },
      }

      await Promise.all([
        UserModel.findOneAndUpdate({ _id: senderId }, senderUpdate),
        UserModel.findOneAndUpdate({ _id: session.user._id }, receiverUpdate),
      ])
    } else {
      await UserModel.findOneAndUpdate({ _id: session.user._id }, commonUpdate)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    )
  }
}
