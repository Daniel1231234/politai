"use client"

import { Transition, Dialog } from "@headlessui/react"
import Image from "next/image"
import Link from "next/link"
import { FC, Fragment, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import AppLogo from "@/components/AppLogo"
import Button from "@/components/Button"
import { signOut } from "next-auth/react"
import toast from "react-hot-toast"
import FriendRequestPreviewModal from "@/components/FriendRequestPreviewModal"
import AppFooter from "@/components/AppFooter"
import { FaBell, FaUsers, FaHome, FaSignOutAlt, FaBars } from "react-icons/fa"
import { MdClose } from "react-icons/md"
import { FriendRequest } from "@/types"

interface MobileFeedLayoutProps {
  user: any
  friendRequests: FriendRequest[]
}

const MobileFeedLayout: React.FC<MobileFeedLayoutProps> = ({
  user,
  friendRequests,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const handleFriendRequest = async (
    senderId: string,
    action: "accept" | "deny"
  ) => {
    try {
      const res = await fetch(`/api/friends/${action}`, {
        method: "POST",
        body: JSON.stringify(senderId),
      }).then((res) => res.json())
      if (res.success) {
        toast.success(`You have successfully ${action}ed the friend request`)
      }
    } catch (error) {
      console.log("error in handle friendRequests in feed header => ", error)
      toast.error("Something went wrong!")
    }
  }

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (friendRequests.length === 0) {
      toast.error("You dont have friend requests")
      return
    }
    setModalOpen(true)
  }

  const handleSignout = async () => {
    try {
      await signOut()
    } catch (error) {
      toast.error("There was a problem signing out")
    }
  }

  return (
    <>
      <div className="fixed z-10  bg-zinc-50 border-b  border-zinc-200 top-0 inset-x-0 py-0 px-0">
        <div className="w-full flex justify-between items-center p-2 bg-zinc-200 ">
          <AppLogo />
          <button
            onClick={handleOpenModal}
            className="h-10 w-10 rounded-full flex items-center justify-center relative "
          >
            {friendRequests.length > 0 && (
              <div className="rounded-full w-5 h-5 text-sm flex justify-center items-center text-white bg-indigo-600 absolute top-0 left-0 ml-[-10px]">
                {friendRequests.length}
              </div>
            )}
            <FaBell className="fill-current" />
          </button>
          <Button onClick={() => setOpen(true)} className="gap-4">
            Menu <FaBars className="h-6 w-6" />
          </Button>
        </div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <div className="fixed inset-0 " />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none  fixed inset-y-0 left-0 flex max-w-full pr-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md ">
                      <div className="flex h-full  flex-col overflow-hidden bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 ">
                              Feed
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-white  text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <MdClose
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <nav className="flex  flex-1 flex-col">
                            <ul
                              role="list"
                              className="flex flex-1 flex-col justify-between gap-y-7"
                            >
                              <li>
                                <div className="text-sm font-semibold leading-6 text-gray-700 ">
                                  Overview
                                </div>
                                <ul
                                  role="list"
                                  className="-mx-2 mt-2 space-y-1"
                                >
                                  <li>
                                    <Link
                                      href={`/profile/${user._id}`}
                                      className="text-gray-700 hover:text-indigo-600 hover:bg-secondery group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold items-center"
                                    >
                                      <span className="text-gray-400  border-gray-200 ">
                                        <Image
                                          className="rounded-full"
                                          width={36}
                                          height={36}
                                          src={user?.image!}
                                          alt={user?.name as string}
                                        />
                                      </span>
                                      <span className="truncate">
                                        {user?.name}
                                      </span>
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
                                      href="/groups"
                                      className="text-gray-700 hover:text-indigo-600 hover:bg-secondery group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold items-center"
                                    >
                                      <span className="text-gray-400 border-gray-400">
                                        <FaUsers className="h-9 w-9 rounded-full" />
                                      </span>
                                      <span className="truncate">Groups</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      onClick={handleSignout}
                                      className="text-gray-700 w-full hover:text-indigo-600 hover:bg-secondery group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold items-center"
                                    >
                                      <span className="text-gray-400 border-gray-400">
                                        <FaSignOutAlt className="h-9 w-9 rounded-full" />
                                      </span>
                                      <span className="truncate">Sign out</span>
                                    </button>
                                  </li>
                                </ul>
                              </li>
                              <li className="py-4">
                                <AppFooter />
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <div className="fixed bottom-0 left-0 w-full bg-zinc-200 z-10 shadow-md py-2">
          <AppFooter />
        </div>
      </div>
      {modalOpen && (
        <FriendRequestPreviewModal
          setOpen={setModalOpen}
          open={modalOpen}
          friendRequests={friendRequests}
          handleFriendRequest={handleFriendRequest}
        />
      )}
    </>
  )
}

export default MobileFeedLayout
