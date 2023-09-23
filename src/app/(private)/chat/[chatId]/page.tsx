import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Messages from "@/components/Messages"
import ChatInput from "@/components/ChatInput"
import { Message } from "@/types"
import { User } from "next-auth"
import { getChatData, getCurrChat, getUsersById } from "@/actions"
interface PageProps {
  params: {
    chatId: string
  }
}

const PrivateChatPage = async ({ params }: PageProps) => {
  const { chatId } = params

  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth")

  const [userId1, userId2] = chatId.split("--")

  if (session.user._id !== userId1 && session.user._id !== userId2) {
    redirect("/feed")
  }

  const { chat, chatPartner } = await getChatData(chatId, session.user._id)

  const chatMessages = chat?.messages?.sort(
    (a: Message, b: Message) => b.createdAt - a.createdAt
  )

  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh - 6rem)] relative sm:px-0 ">
      <div className="flex sm:items-center justify-between py-3  border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative ">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <Image
                fill
                referrerPolicy="no-referrer"
                src={chatPartner?.image}
                alt={`${chatPartner?.name} profile picture`}
                className="rounded-full"
                sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
              />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center">
              <span className="text-gray-700 mr-3  font-semibold">
                {chatPartner.name}
              </span>
            </div>

            <span className="text-sm text-gray-600">{chatPartner?.email}</span>
          </div>
        </div>
      </div>
      <Messages
        chatId={chatId}
        chatMessages={chatMessages}
        chatPartnerId={chatPartner._id}
        user={session.user}
      />
      <ChatInput dbFriend={chatPartner} chatId={chatId} />
    </div>
  )
}

export default PrivateChatPage
