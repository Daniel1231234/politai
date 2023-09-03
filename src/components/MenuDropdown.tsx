"use client"

import { Menu, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import Image from "next/image"
import { FaUserFriends } from "react-icons/fa"
import { RiLogoutBoxFill, RiLogoutBoxLine } from "react-icons/ri"
import { signOut } from "next-auth/react"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import useFriendRequests from "@/hooks/useFriendRequests"
import { useRouter } from "next/navigation"
import FriendRequestPreviewModal from "./FriendRequestPreviewModal"
import { FriendRequest } from "@/types"
import { UserDocument } from "@/models/user"

interface MenuDropdownProps {
  user: UserDocument
  friendRequests: FriendRequest[]
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  user,
  friendRequests,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

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
        router.refresh()
      }
    } catch (error) {
      console.log("error in handle friendRequests in feed header => ", error)
      toast.error("Something went wrong!")
    }
  }

  const handleSignout = async () => {
    try {
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      toast.error("There was a problem signing out")
    }
  }

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (friendRequests.length === 0) {
      toast.error("You dont have friend requests")
      return
    }
    setOpen(true)
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div className="relative">
          <Menu.Button>
            {friendRequests.length > 0 && (
              <div className="rounded-full w-5 h-5 text-sm flex justify-center items-center text-white bg-indigo-600 absolute top-0 left-0 ml-[-10px]">
                {friendRequests.length}
              </div>
            )}

            <Image
              src={user.image!}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={(e) => e.preventDefault()}
                    className={cn(
                      "group  w-full rounded-md px-2 py-2 text-sm",
                      {
                        "bg-violet-500 text-white": active,
                        "text-gray-900": !active,
                      }
                    )}
                  >
                    <div className="flex flex-col text-center">
                      <span className="font-semibold">{user.name}</span>
                      <span className="text-[10px]">
                        Signed in as {user.email}
                      </span>
                    </div>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleOpenModal}
                    className={cn(
                      `group flex w-full items-center rounded-md px-2 py-2 text-sm`,
                      {
                        "bg-violet-500 text-white": active,
                        "text-gray-900": !active,
                        "font-bold ": friendRequests.length > 0,
                      }
                    )}
                  >
                    {active ? (
                      <FaUserFriends
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaUserFriends
                        className="mr-2 h-5 w-5 text-violet-500"
                        aria-hidden="true"
                      />
                    )}
                    Friend requests
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleSignout}
                    className={cn(
                      "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                      {
                        "bg-red-600 text-white": active,
                        "text-gray-900": !active,
                      }
                    )}
                  >
                    {active ? (
                      <RiLogoutBoxFill
                        className="mr-2 h-5 w-5 "
                        aria-hidden="true"
                      />
                    ) : (
                      <RiLogoutBoxLine
                        className="mr-2 h-5 w-5 text-violet-500"
                        aria-hidden="true"
                      />
                    )}
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {open && (
        <FriendRequestPreviewModal
          setOpen={setOpen}
          open={open}
          friendRequests={friendRequests}
          handleFriendRequest={handleFriendRequest}
        />
      )}
    </>
  )
}

export default MenuDropdown
