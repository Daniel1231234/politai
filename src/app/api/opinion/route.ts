import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import OpinionModel from "../../../models/opinion"
import UserModel from "../../../models/user"
import { connectMongoDB } from "../../../lib/db"

export const POST = async (req: Request) => {
  try {
    const session: any = await getServerSession(authOptions)
    await connectMongoDB()
    if (!session) return new NextResponse("Unauthorized", { status: 401 })
    const body = await req.json()

    const newOpinion = await OpinionModel.create({
      title: body.title,
      body: body.body,
      images: body.images,
      topics: body.topics,
      creator: session.user._id,
      createdAt: Date.now(),
    })

    await UserModel.findOneAndUpdate(
      { email: session.user.email },
      { $push: { opinions: newOpinion._id } },
      { new: true }
    )

    return NextResponse.json({ success: true, newOpinion })
  } catch (error: any) {
    console.log("Error message: ", error?.message)
    console.log("Stack trace: ", error?.stack)
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
