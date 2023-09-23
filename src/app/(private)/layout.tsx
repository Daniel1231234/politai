import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { FaHome } from "react-icons/fa"
import FeedHeader from "@/components/FeedHeader"
import { Chat, FriendRequest } from "@/types"
import AppFooter from "@/components/AppFooter"
import MobileFeedLayout from "@/components/MobileFeedLayout"
import SidebarChatList from "@/components/SidebarChatList"
import { getUserChats, getUserFriendRequests } from "@/actions"

interface LayoutProps {
  children: React.ReactNode
}

const FeedLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth")

  const friendRequests: FriendRequest[] = await getUserFriendRequests(
    session.user._id
  )
  const chats: Chat[] = await getUserChats(session.user._id)

  return (
    <>
      <section className="bg-light-1">
        <div className="lg:hidden">
          <MobileFeedLayout
            user={session.user}
            friendRequests={friendRequests}
            chats={chats}
          />
        </div>
        <div className="hidden lg:block">
          <FeedHeader user={session.user} friendRequests={friendRequests} />
        </div>
        <div className="w-full flex h-[calc(100vh-66px)]">
          <div className="hidden lg:flex w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto px-6">
            <nav className="flex flex-1 flex-col border-r-4">
              <ul
                role="list"
                className="flex flex-1 flex-col justify-between gap-y-7"
              >
                <li>
                  <div className="text-sm font-semibold leading-6 text-gray-700 ">
                    Overview
                  </div>

                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    <li>
                      <Link
                        href={`/profile/${session.user._id}`}
                        className="text-gray-700 hover:text-indigo-600 hover:bg-secondery group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold items-center"
                      >
                        <span className="text-gray-400  border-gray-200 ">
                          <Image
                            className="rounded-full"
                            width={36}
                            height={36}
                            src={session.user.image!}
                            alt={session.user?.name as string}
                          />
                        </span>
                        <span className="truncate">{session.user?.name}</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/feed"
                        className="text-gray-700 hover:text-indigo-600 hover:bg-secondery group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold items-center"
                      >
                        <span className="text-gray-400 border-gray-400">
                          <FaHome className="h-9 w-9 rounded-full" />
                        </span>
                        <span className="truncate">Feed</span>
                      </Link>
                    </li>

                    <li>
                      <div>
                        <SidebarChatList
                          chats={chats}
                          sessionId={session.user._id}
                        />
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="py-4">
                  <AppFooter />
                </li>
              </ul>
            </nav>
          </div>
          <aside className="py-16 px-4 w-full overflow-y-auto lg:py-12">
            {children}
          </aside>
        </div>
      </section>
    </>
  )
}

export default FeedLayout
