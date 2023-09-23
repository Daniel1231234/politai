import OpinionModel from "@/models/opinion"
import CommentModel from "@/models/comment"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/db"
import { toPusherKey } from "@/lib/utils"
import { pusherServer } from "@/lib/pusher"

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
    const { commentText } = await req.json()

    const opinion = await OpinionModel.findById({ _id: params.opinionId })
    if (!opinion) return

    const newComment = await CommentModel.create({
      text: commentText,
      creator: session.user._id,
      opinion: opinion._id,
    })

    await Promise.all([
      pusherServer.trigger(
        toPusherKey(`opinion:${opinion._id}:comments`),
        "add-comment",
        { newComment, opinionId: opinion._id }
      ),
      OpinionModel.findOneAndUpdate(
        { _id: opinion._id },
        { $push: { comments: newComment._id } }
      ),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, error: "Something went wrong!" },
      { status: 500 }
    )
  }
}

export const DELETE = async (req: Request, { params }: Props) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { commentid } = await req.json()
    console.log(commentid)

    const commentToDelete = await CommentModel.findById(commentid)

    if (!commentToDelete) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      )
    }

    if (commentToDelete.creator.toString() !== session.user._id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized to delete this comment" },
        { status: 401 }
      )
    }

    await Promise.all([
      pusherServer.trigger(
        toPusherKey(`opinion:${params.opinionId}:comments`),
        "remove-comment",
        { opinionId: params.opinionId, commentId: commentToDelete._id }
      ),
      CommentModel.findByIdAndRemove(commentToDelete._id),
      OpinionModel.findByIdAndUpdate(params.opinionId, {
        $pull: { comments: commentToDelete._id },
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, error: "Something went wrong!" },
      { status: 500 }
    )
  }
}
