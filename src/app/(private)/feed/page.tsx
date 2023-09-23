import { getInitialOpinions, getUserFriends } from "@/actions"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Divider from "@/components/Divider"
import NewOpinionInput from "@/components/NewOpinionInput"
import OpinionList from "@/components/OpinionList"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"

interface FeedPageProps {}

const FeedPage = async ({}: FeedPageProps) => {
  const session = await getServerSession(authOptions)
  if (!session) return redirect("/auth")

  return (
    <>
      <NewOpinionInput user={session.user} />
      <Divider />
      <OpinionList user={session.user} />
    </>
  )
}

export default FeedPage
