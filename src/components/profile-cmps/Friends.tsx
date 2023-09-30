"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"
import { toast } from "react-hot-toast"
import EmptyState from "../EmptyState"
import { hrefContructor } from "@/lib/utils"
import axios from "axios"
import { User } from "next-auth"
import { getCurrChat } from "@/actions"
import { AiFillDelete } from "react-icons/ai"
import { MdChat } from "react-icons/md"

interface FriendsProps {
  isAllreadyFrinds?: boolean
  isUserProfile: boolean
  friends: any
  sessionId: string
}

const Friends: React.FC<FriendsProps> = ({
  isUserProfile,
  friends,
  sessionId,
}) => {
  const router = useRouter()

  const handleDeleteFriend = async (friendId: string) => {
    try {
      const { data } = await axios.delete(`/api/friends/remove/${friendId}`)

      if (data.success === true) {
        toast.success("Friend delete successfully")
      }
      router.refresh()
    } catch (err) {
      console.log(err)
      toast.error("Cant remove this friend! please try again later")
    }
  }

  const handleStartChat = async (friend: User) => {
    try {
      const chatId = hrefContructor(sessionId, friend._id)
      const currChat = await getCurrChat(chatId)
      if (currChat) {
        router.push(`/chat/${chatId}`)
      } else {
        const { data } = await axios.post("/api/chat", {
          chatId,
          friend,
        })
        console.log(data)
        if (data.success) {
          router.push(`/chat/${chatId}`)
        }
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return (
    <div id="friends" className="w-full">
      {friends.length > 0 ? (
        friends.map((friend: any) => (
          <div
            key={friend._id}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            <div className="flex relative items-center space-x-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image width={40} height={40} src={friend.image!} alt="" />
              </div>
              <span className="lg:text-lg text-sm font-medium">
                {friend.name}
              </span>
            </div>
            {isUserProfile && (
              <div className="flex space-x-2">
                <button
                  className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
                  onClick={() => handleDeleteFriend(friend._id)}
                >
                  <AiFillDelete className="w-5 h-5" />
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                  onClick={() => handleStartChat(friend)}
                >
                  <MdChat className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="p-6">
          <EmptyState
            title="No Friends Yet"
            description="You haven't added any friends yet. Would you like to find people to connect with?"
            buttonLabel="Find Friends"
            onButtonClick={() => router.push("/feed")}
          />
        </div>
      )}
    </div>
  )
}

export default Friends
