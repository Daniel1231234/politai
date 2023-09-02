import { authOptios } from "@/app/api/auth/[...nextauth]/route"
import Divider from "@/components/Divider"
import NewOpinionInput from "@/components/NewOpinionInput"
import OpinionList from "@/components/OpinionList"
import { connectMongoDB } from "@/lib/db"
import OpinionModel from "@/models/opinion"
import UserModel from "@/models/user"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import React from "react"

interface FeedPageProps {}

async function getUserFriends(_id: string) {
  await connectMongoDB()
  const user = await UserModel.findById({ _id }).populate("friends")
  if (!user) return
  return user.friends
}

async function getInitialOpinions() {
  await connectMongoDB()
  const opinions = await OpinionModel.find().populate("creator")
  return opinions
}

async function getOpinionComments() {}

const FeedPage = async ({}: FeedPageProps) => {
  const session = await getServerSession(authOptios)
  if (!session) return notFound()

  const initialOpinions = await JSON.parse(
    JSON.stringify(await getInitialOpinions())
  )

  const userFriends = await JSON.parse(
    JSON.stringify(await getUserFriends(session.user._id))
  )

  return (
    <>
      <NewOpinionInput user={session.user} />
      <Divider />
      <OpinionList
        initialOpinions={initialOpinions}
        user={session.user}
        userFriends={userFriends}
      />
    </>
  )
}

export default FeedPage
