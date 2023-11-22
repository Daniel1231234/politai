import connectDB from "@/lib/mongodb"
import UserModel from "@/models/user"
import { NextResponse } from "next/server"

interface NewUserRequest {
  name: string
  email: string
  password: string
  image: string
}
interface NewUserResponse {
  id: string
  name: string
  email: string
  image: string
  role: string
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>

export const POST = async (req: Request): Promise<NewResponse> => {
  try {
    const body = (await req.json()) as NewUserRequest
    await connectDB()
    const oldUser = await UserModel.findOne({ email: body.email })

    if (oldUser) {
      return NextResponse.json(
        { error: "email is already is use!" },
        { status: 422 }
      )
    }

    body.image = "/images/placeholder.jpg"

    const user = await UserModel.create({ ...body })
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, error: "Something went wrong!" },
      { status: 500 }
    )
  }
}
