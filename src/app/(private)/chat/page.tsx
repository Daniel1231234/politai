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

interface ChatPageProps {}

const ChatPage = async ({}: ChatPageProps) => {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth")

  const userChats: any[] = []

  return (
    <div className="container rounded-md py-12 sm:py-8 ">
      <h1 className="font-bold text-5xl mb-8">Recent chats</h1>
      {!userChats && (
        <Link href={`/profile/${session.user._id}`}>
          Start private chat with your friends{" "}
        </Link>
      )}
      {userChats?.map((friend: any) => (
        <div
          key={friend._id}
          className="relative bg-zinc-50 border border-zinc-200 p-3 rounded-md"
        >
          <Link
            href={`/chat/${hrefContructor(session.user._id, friend._id)}`}
            className="absolute right-4 inset-y-0 flex items-center z-10"
          >
            <FaChevronRight className="h-7 w-7 text-zinc-400 hover:text-zinc-700" />
          </Link>
          <RemoveChatBtn />
          <div className="relative sm:flex">
            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
              <div className="relative h-6 w-6">
                <Image
                  fill
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                  alt={`${friend.name} profile picture`}
                  src={friend.image}
                  sizes="(max-width: 768px) 100vw,
                              (max-width: 1200px) 50vw,
                              33vw"
                />
              </div>
            </div>
            <h4 className="text-lg font-semibold">{friend.name}</h4>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatPage
