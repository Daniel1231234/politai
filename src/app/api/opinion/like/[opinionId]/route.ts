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

    const userId = session.user._id

    // First, find the opinion to see if the user has already liked it
    const opinion = await OpinionModel.findById(params.opinionId)

    // Check if the user has already liked the opinion
    const existingLike = opinion?.likes.find((like) => like.creator === userId)

    let updatedOpinion

    if (existingLike) {
      // User has already liked, so we remove the like
      updatedOpinion = await OpinionModel.findOneAndUpdate(
        { _id: params.opinionId },
        { $pull: { likes: { id: existingLike.id } } },
        { new: true }
      )
    } else {
      // User has not yet liked, so we add a new like
      const newLike: Like = {
        id: generateRandomId(),
        creator: userId,
      }

      updatedOpinion = await OpinionModel.findOneAndUpdate(
        { _id: params.opinionId },
        { $push: { likes: newLike } },
        { new: true }
      )
    }

    return NextResponse.json(
      { success: true, data: updatedOpinion },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
