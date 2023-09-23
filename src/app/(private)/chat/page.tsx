import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import EmptyState from "@/components/EmptyState"
import { Chat } from "@/types"
import ManageChat from "@/components/ManageChat"
import { getUserChats } from "@/actions"

interface ChatPageProps {}

const ChatPage = async ({}: ChatPageProps) => {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth")

  const userChats: Chat[] = await getUserChats(session.user._id)

  return (
    <div className="container rounded-md py-12 sm:py-8 ">
      {!userChats || userChats.length === 0 ? (
        <EmptyState
          title="No Active Chats"
          description="You haven't started any chats yet. Use this platform to engage in meaningful conversations."
          buttonLabel="Start a New Chat"
        />
      ) : (
        <ManageChat userChats={userChats} sessionId={session.user._id} />
      )}
    </div>
  )
}

export default ChatPage
