"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { hrefContructor, toPusherKey } from "@/lib/utils"
import { toast } from "react-hot-toast"
import { User } from "next-auth"
import { Chat, Message } from "@/types"
import Link from "next/link"
import { SiWechat } from "react-icons/si"

interface SidebarChatListProps {
  chats: Chat[]
  sessionId: string
}

const SidebarChatList: React.FC<SidebarChatListProps> = ({
  chats,
  sessionId,
}) => {
  const path = usePathname()
  const router = useRouter()

  const [unseenMsgs, setUnseenMsgs] = useState<Message[]>([])
  const [isOpenSubMenu, setIsOpenSubMenu] = useState<boolean>(false)

  useEffect(() => {
    if (path?.includes("chat")) {
      setUnseenMsgs((prev) => {
        return prev.filter((msg) => !path.includes(msg.sender._id))
      })
    }
  }, [path])

  return (
    <>
      <div
        onClick={() => setIsOpenSubMenu(!isOpenSubMenu)}
        className="text-gray-700 hover:text-indigo-600 cursor-pointer hover:bg-secondery group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold items-center transition duration-100 ease-in"
      >
        <span className="text-gray-400 border-gray-400">
          <SiWechat className="h-9 w-9 rounded-full" />
        </span>
        <span className="truncate">Chat</span>
      </div>
      {isOpenSubMenu && (
        <ul
          role="list"
          className={`max-h-[25rem] overflow-y-auto -mx-2 space-y-1 transition-all duration-300 ease-in-out`}
        >
          {chats?.sort().map((chat) => {
            const unseenMsgsCount = unseenMsgs.filter((unseenMsg) => {
              return unseenMsg.sender._id === chat._id
            }).length

            const href = `/chat/${hrefContructor(sessionId, chat._id)}`
            const isActive = path === href

            const friendName = chat.users.find(
              (usr) => usr._id !== sessionId
            ).name

            return (
              <li key={chat._id} className="relative">
                <a
                  className={`flex h-8 cursor-pointer items-center truncate rounded-md px-8 py-4 text-sm text-gray-700 font-semibold hover:text-indigo-600 transition duration-100 ease-in ${
                    isActive ? "text-indigo-600" : "text-gray-700"
                  }`}
                  href={href}
                >
                  {friendName}
                  {unseenMsgs.length > 0 && (
                    <div className="bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center">
                      {unseenMsgsCount}
                    </div>
                  )}
                </a>
              </li>
            )
          })}
          <li className="relative">
            <a
              className="flex h-8 cursor-pointer items-center truncate rounded-md px-8 py-4 text-sm text-gray-700 font-bold hover:text-indigo-600 transition duration-100 ease-in active:text-indigo-600"
              href="/chat"
            >
              <span>Manage chats</span>
            </a>
          </li>
        </ul>
      )}
    </>
  )
}

export default SidebarChatList
