import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import UserModel from "@/models/user"
import Messages from "@/components/Messages"
import ChatInput from "@/components/ChatInput"
import ChatModel from "@/models/chat"
import { Chat, DBUser } from "@/types"
import { connectMongoDB } from "@/lib/db"
import { User, Session } from "next-auth"

interface PageProps {
  params: {
    chatId: string
  }
}

async function getUsersById(userId: string, friendId: string) {
  await connectMongoDB()
  const res = await Promise.all([
    UserModel.findById({ _id: userId }, "_id name email image chats"),
    UserModel.findById({ _id: friendId }, "_id name email image chats role"),
  ])

  return JSON.parse(JSON.stringify(res))
}

async function createDbChat(chatId: string, user: User, friend: User) {
  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({ chatId, user, friend }),
    }).then((res) => res.json())
    console.log(res)
    if (res.success) {
      return res
    }
  } catch (error) {
    console.log("error in createDbChat => ", error)
    throw error
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

  const chatPartnerId = session.user._id === userId1 ? userId2 : userId1

  const [dbUser, dbFriend]: [DBUser, DBUser] = await getUsersById(
    userId1,
    userId2
  )

  console.log("dbUser => ", dbUser)
  console.log("dbFriend => ", dbFriend)

  const chatPartner: User = {
    _id: session.user._id === userId1 ? userId2 : userId1,
    name: session.user._id === userId1 ? dbFriend.name : dbUser.name,
    email: session.user._id === userId1 ? dbFriend.email : dbUser.email,
    image: session.user._id === userId1 ? dbFriend.image : dbUser.image,
    role: session.user._id === userId1 ? dbFriend.role : dbUser.role,
  }

  const dbChat: Chat = await createDbChat(chatId, session.user, chatPartner)

  const chatMessages = dbChat?.messages?.sort(
    (a, b) => b.createdAt - a.createdAt
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
                src={chatPartner.image}
                alt={`${chatPartner.name} profile picture`}
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

            <span className="text-sm text-gray-600">{chatPartner.email}</span>
          </div>
        </div>
      </div>
      <Messages
        chatId={chatId}
        chatMessages={chatMessages}
        chatPartnerId={chatPartnerId}
        user={session.user}
      />
      <ChatInput dbFriend={dbFriend} chatId={chatId} />
    </div>
  )
}

export default PrivateChatPage
