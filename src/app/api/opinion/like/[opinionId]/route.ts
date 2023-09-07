import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/db"
import OpinionModel from "@/models/opinion"
import { generateRandomId } from "@/lib/utils"
import { Like } from "@/types"

type Props = {
  params: {
    opinionId: string
  }
}

export const POST = async (req: Request, { params }: Props) => {
  try {
    await connectMongoDB()
    const session = await getServerSession(authOptions)
    if (!session)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )

    const newLike: Like = {
      id: generateRandomId(),
      creator: session.user._id,
    }

    const updatedOpinion = await OpinionModel.findOneAndUpdate(
      { _id: params.opinionId },
      { $push: { likes: newLike } },
      { new: true }
    )

    return NextResponse.json(
      { success: true, data: updatedOpinion },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, error: "Something went wrong!" },
      { status: 500 }
    )
  }
}
