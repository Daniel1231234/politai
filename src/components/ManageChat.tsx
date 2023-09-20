"use client"

import React, { useState, useEffect } from "react"
import { FaChevronRight, FaTrashAlt } from "react-icons/fa"
import Image from "next/image"
import RemoveChatBtn from "@/components/RemoveChatBtn"
import { Chat } from "@/types"
import { hrefContructor } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface ManageChatProps {
  userChats: Chat[]
  sessionId: string
}

const ManageChat: React.FC<ManageChatProps> = ({ userChats, sessionId }) => {
  const path = usePathname()

  return (
    <>
      <h1 className="font-bold text-5xl mb-8">Recent chats</h1>
      {userChats.sort().map((chat) => {
        const href = `/chat/${hrefContructor(sessionId, chat._id)}`
        const friendName = chat.users.find((usr) => usr._id !== sessionId).name

        return (
          <div
            key={chat._id}
            className="relative bg-zinc-50 border border-zinc-200 p-3 rounded-md"
          >
            <a
              href={href}
              className="absolute right-4 inset-y-0 flex items-center z-10"
            >
              <FaChevronRight className="h-7 w-7 text-zinc-400 hover:text-zinc-700" />
            </a>
            <div className="relative sm:flex">
              <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                <div className="relative h-6 w-6">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    alt={`${friendName} profile picture`}
                    src={`/images/placeholder.jpg`}
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                  />
                </div>
              </div>
              <h4>{friendName}</h4>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ManageChat
