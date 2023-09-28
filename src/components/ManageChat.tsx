import { FaChevronRight } from "react-icons/fa"
import Image from "next/image"
import { Chat } from "@/types"
import Link from "next/link"
import RemoveChatBtn from "./RemoveChatBtn"

interface ManageChatProps {
  userChats: Chat[]
  sessionId: string
}

const ManageChat: React.FC<ManageChatProps> = ({ userChats, sessionId }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-bold sm:text-5xl text-3xl mb-6 text-gray-800">
        Recent chats
      </h1>
      {userChats.sort().map((chat) => {
        const friend = chat.users.find((usr) => usr._id !== sessionId)

        return (
          <div
            key={chat._id}
            className="relative bg-zinc-50 border border-zinc-200 p-3 rounded-md max-w-lg"
          >
            <Link
              href={`/chat/${chat.chatId}`}
              className="absolute right-4 inset-y-0 flex items-center z-10"
            >
              <FaChevronRight className="h-7 w-7 text-zinc-400 hover:text-zinc-700" />
            </Link>

            <RemoveChatBtn chatId={chat.chatId} />

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
              <h4>{friend.name}</h4>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ManageChat
