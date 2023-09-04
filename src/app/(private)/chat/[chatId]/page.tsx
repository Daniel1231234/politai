import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import UserModel from "@/models/user"
import Messages from "@/components/Messages"
import ChatInput from "@/components/ChatInput"

interface PageProps {
  params: {
    chatId: string
  }
}

async function getUsersById(userId: string, friendId: string) {
  const res = await Promise.all([
    UserModel.findById({ _id: userId }),
    UserModel.findById({ _id: friendId }),
  ])

  return JSON.parse(JSON.stringify(res))
}

const PrivateChatPage = async ({ params }: PageProps) => {
  const { chatId } = params
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth")

  const { user } = session
  const [userId1, userId2] = chatId.split("--")

  if (user._id !== userId1 && user._id !== userId2) {
    redirect("/feed")
  }

  const chatPartnerId = user._id === userId1 ? userId2 : userId1

  const [dbUser, dbFriend] = await getUsersById(userId1, userId2)

  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh - 6rem)] relative sm:px-0 ">
      <div className="flex sm:items-center justify-between py-3  border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative ">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <Image
                fill
                referrerPolicy="no-referrer"
                src={dbFriend?.image!}
                alt={`${dbFriend?.name} profile picture`}
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
                {dbFriend?.name}
              </span>
            </div>

            <span className="text-sm text-gray-600">{dbFriend?.email}</span>
          </div>
        </div>
      </div>
      <Messages />
      <ChatInput dbFriend={dbFriend} chatId={chatId} />
    </div>
  )
}

export default PrivateChatPage
