import OpinionModel from "../../../../../models/opinion"
import CommentModel from "../../../../../models/comment"

import { getServerSession } from "next-auth"
import { authOptios } from "../../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"

type Props = {
  params: {
    opinionId: string
  }
}

export const POST = async (req: Request, { params }: Props) => {
  try {
    const session = await getServerSession(authOptios)
    if (!session)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    const commentText = await req.json()

    const newComment = await CommentModel.create({
      text: commentText,
      creator: session.user.id,
      opinion: params.opinionId,
    })

    const updatedOpinion = await OpinionModel.findOneAndUpdate(
      { _id: params.opinionId },
      { $push: { comments: newComment._id } }
    )

    console.log(updatedOpinion)

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
