import React from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { FaChevronRight, FaTrashAlt } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"
import { hrefContructor } from "../../../lib/utils"
import RemoveChatBtn from "@/components/RemoveChatBtn"
import { connectMongoDB } from "@/lib/db"
import UserModel from "@/models/user"
import EmptyState from "@/components/EmptyState"
import { Chat } from "@/types"
import ManageChat from "@/components/ManageChat"

interface ChatPageProps {}

async function getUserChats(userId: string) {
  try {
    await connectMongoDB()
    const user = await UserModel.findById({ _id: userId }).populate("chats")
    if (!user) return

    return JSON.parse(JSON.stringify(user?.chats))
  } catch (error) {
    console.log(error)
    throw error
  }
}

const ChatPage = async ({}: ChatPageProps) => {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth")

  const userChats: Chat[] = await getUserChats(session.user._id)

  return (
    <div className="container rounded-md py-12 sm:py-8 ">
      {!userChats || userChats.length === 0 ? (
        <EmptyState
          title="You dont have active chats yet"
          description=""
          buttonLabel=""
        />
      ) : (
        <ManageChat userChats={userChats} sessionId={session.user._id} />
      )}
    </div>
  )
}

export default ChatPage
