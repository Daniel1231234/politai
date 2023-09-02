// import { connectMongoDB } from "../../../lib/db"
import { getServerSession } from "next-auth"
import { authOptios } from "../../api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import OpinionModel from "../../../models/opinion"
import UserModel from "../../../models/user"

export const POST = async (req: Request) => {
  try {
    const session: any = await getServerSession(authOptios)

    if (!session) return new NextResponse("Unauthorized", { status: 401 })
    const body = await req.json()

    const newOpinion = await OpinionModel.create({
      title: body.title,
      body: body.body,
      images: body.images,
      topics: body.topics,
      creator: session.user.id,
    })

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: session.user.email },
      { $push: { opinions: newOpinion._id } },
      { new: true }
    )
    console.log("updatedUser => ", updatedUser)

    return NextResponse.json({ success: true, newOpinion })
  } catch (error: any) {
    console.log("Error message: ", error?.message)
    console.log("Stack trace: ", error?.stack)
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
