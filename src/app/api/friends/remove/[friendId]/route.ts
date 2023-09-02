import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptios } from "../../../auth/[...nextauth]/route"
import UserModel from "@/models/user"

interface ParamsProps {
  params: { friendId: string }
}

export const DELETE = async (req: Request, { params }: ParamsProps) => {
  try {
    const session = await getServerSession(authOptios)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    console.log(session)

    await Promise.all([
      await UserModel.findOneAndUpdate(
        { _id: params.friendId },
        { $pull: { friends: session.user._id } }
      ),
      await UserModel.findOneAndUpdate(
        { _id: session.user._id },
        { $pull: { friends: params.friendId } }
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
