import { getInitialOpinions, getUserFriends } from "@/actions"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Divider from "@/components/Divider"
import NewOpinionInput from "@/components/NewOpinionInput"
import OpinionList from "@/components/OpinionList"
import { UserDocument } from "@/models/user"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"

interface FeedPageProps {}

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
        user={session.user}
        userFriends={userFriends}
      />
    </>
  )
}

export default FeedPage
