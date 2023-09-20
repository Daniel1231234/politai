import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Divider from "@/components/Divider"
import NewOpinionInput from "@/components/NewOpinionInput"
import OpinionList from "@/components/OpinionList"
import { connectMongoDB } from "@/lib/db"
import OpinionModel from "@/models/opinion"
import UserModel, { UserDocument } from "@/models/user"
import { DBUser } from "@/types"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"
import React from "react"

interface FeedPageProps {}

export async function getUserFriends(_id: string) {
  await connectMongoDB()
  const user = await UserModel.findById({ _id }).populate("friends")
  if (!user) return

  return JSON.parse(JSON.stringify(user.friends))
}

async function getInitialOpinions() {
  await connectMongoDB()

  try {
    // Try populating the creator and comments fields
    const opinions = await OpinionModel.find()
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "creator", model: "User" },
      })

    return JSON.parse(JSON.stringify(opinions))
  } catch (error) {
    console.error("Failed to populate:", error)
  }
}

const FeedPage = async ({}: FeedPageProps) => {
  const session = await getServerSession(authOptions)
  if (!session) return redirect("/auth")

  const initialOpinions = await getInitialOpinions()

  const userFriends = await getUserFriends(session.user._id)

  return (
    <>
      <NewOpinionInput user={session.user} />
      <Divider />
      <OpinionList
        initialOpinions={initialOpinions}
        user={session.user as UserDocument}
        userFriends={userFriends}
      />
    </>
  )
}

export default FeedPage
