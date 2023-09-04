import React from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { getUserFriends } from "../feed/page"
import { FaChevronRight } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"
import { hrefContructor } from "../../../lib/utils"
interface ChatPageProps {}

const ChatPage = async ({}: ChatPageProps) => {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth")

  const friends = await getUserFriends(session.user._id)

  const friendsWithLastMsg = []

  return (
    <div className="container rounded-md py-12  sm:py-8 ">
      <h1 className="font-bold text-5xl mb-8">Recent chats</h1>

      {/* {friendsWithLastMsg.length === 0 && <p>No messages yet</p>} */}

      {friends.map((friend: any) => (
        <div
          key={friend._id}
          className="relative  bg-zinc-50 border border-zinc-200 p-3 rounded-md"
        >
          <div className="absolute  right-4 inset-y-0 flex items-center">
            <FaChevronRight className="h-7 w-7 text-zinc-400" />
          </div>
          <Link
            href={`/chat/${hrefContructor(session.user._id, friend._id)}`}
            className="relative sm:flex"
          >
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
            <h4 className="text-lg  font-semibold">{friend.name}</h4>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ChatPage
