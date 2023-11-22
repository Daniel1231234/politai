import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import UserModel from "@/models/user"
import connectDB from "@/lib/mongodb"

interface ParamsProps {
  params: { friendId: string }
}

export const DELETE = async (req: Request, { params }: ParamsProps) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    await connectDB()

    const friend = await UserModel.findById(params.friendId)
    if (!friend) {
      return new NextResponse("Friend not found", { status: 401 })
    }

    await Promise.all([
      UserModel.findOneAndUpdate(
        { _id: friend._id },
        { $pull: { friends: session.user._id } }
      ),
      UserModel.findOneAndUpdate(
        { _id: session.user._id },
        { $pull: { friends: friend._id } }
      ),
    ])

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.log("Error:", error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}
