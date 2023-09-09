"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { hrefContructor, toPusherKey } from "@/lib/utils"
import { toast } from "react-hot-toast"
import { User } from "next-auth"
import { FiTrash2 } from "react-icons/fi"

interface SidebarChatListProps {
  friends: any[]
  sessionId: string
}

interface Message {
  id: string
  chatId: string
  sender: User
  content: string
  createdAt: number
}

const SidebarChatList: React.FC<SidebarChatListProps> = ({
  friends,
  sessionId,
}) => {
  const path = usePathname()
  const router = useRouter()
  const [unseenMsgs, setUnseenMsgs] = useState<Message[]>([])
  const [activeChats, setActiveChats] = useState<User[]>(friends)

  useEffect(() => {
    if (path?.includes("chat")) {
      setUnseenMsgs((prev) => {
        return prev.filter((msg) => !path.includes(msg.sender._id))
      })
    }
  }, [path])

  const handleDeleteChat = async (
    e: React.MouseEvent<HTMLElement>,
    friendId: string
  ) => {
    e.preventDefault()
    try {
      //   const res = await axios.delete(`/api/friends/remove/${friendId}`)
      //   console.log(res)
      router.refresh()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
      {activeChats.sort().map((friend) => {
        const unseenMsgsCount = unseenMsgs.filter((unseenMsg) => {
          return unseenMsg.sender._id === friend.id
        }).length

        return (
          <li key={friend._id}>
            <a
              className="text-gray-700 hover:text-indigo-600  group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
              href={`/chat/${hrefContructor(sessionId, friend._id)}`}
            >
              {friend.name}
              {unseenMsgs.length > 0 && (
                <div className="bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center">
                  {unseenMsgsCount}
                </div>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SidebarChatList
