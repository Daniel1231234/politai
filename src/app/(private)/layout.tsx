import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { FaHome } from "react-icons/fa"
import { SiWechat } from "react-icons/si"
import FeedHeader from "@/components/FeedHeader"
import UserModel from "@/models/user"
import { FriendRequest } from "@/types"
import AppFooter from "@/components/AppFooter"
import MobileFeedLayout from "@/components/MobileFeedLayout"

async function getUserFriendRequests(userId: string) {
  try {
    const user = await UserModel.findById({ _id: userId })
    if (!user)
      throw new Error("User not found while getting his friend requests")
    return user.friendRequests
  } catch (error) {
    throw error
  }
}

interface LayoutProps {
  children: React.ReactNode
}

const FeedLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth")

  const user = session.user
  const friendRequests: FriendRequest[] = await getUserFriendRequests(user._id)

  return (
    <>
      <section className="bg-light-1">
        <div className="lg:hidden">
          <MobileFeedLayout user={user} friendRequests={friendRequests} />
        </div>
        <div className="hidden lg:block">
          <FeedHeader user={user} friendRequests={friendRequests} />
        </div>
        <div className="w-full flex gap-8 h-[calc(100vh-66px)]">
          <div className="hidden lg:flex w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r dark:border-none px-6">
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
                            src={user.image!}
                            alt={user?.name as string}
                          />
                        </span>
                        <span className="truncate">{user?.name}</span>
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
                      <Link
                        href="/chat"
                        className="text-gray-700 hover:text-indigo-600 hover:bg-secondery group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold items-center"
                      >
                        <span className="text-gray-400 border-gray-400">
                          <SiWechat className="h-9 w-9 rounded-full" />
                        </span>
                        <span className="truncate">Chat</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="py-4">
                  <AppFooter />
                </li>
              </ul>
            </nav>
          </div>
          <aside className="py-16 px-6 lg:py-12  w-full overflow-y-auto">
            {children}
          </aside>
        </div>
      </section>
    </>
  )
}

export default FeedLayout
