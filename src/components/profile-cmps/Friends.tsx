"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "react-hot-toast"
import EmptyState from "../EmptyState"
import { UserDocument } from "@/models/user"

interface FriendsProps {
  user: UserDocument
  isAllreadyFrinds?: boolean
  isUserProfile: boolean
}

const Friends: React.FC<FriendsProps> = ({ user, isUserProfile }) => {
  const router = useRouter()

  const handleDeleteFriend = async (friendId: string) => {
    try {
      const res: any = await fetch(`/api/friends/remove/${friendId}`, {
        method: "DELETE",
      }).then((res) => res.json())
      if (res.success === true) {
        toast.success("Friend delete successfully")
      }
      router.refresh()
    } catch (err) {
      console.log(err)
      toast.error("Cant remove this friend! please try again later")
    }
  }

  const handleStartChat = (friendId: string) => {
    console.log("start chating")
    // Logic to start a private chat with the friend
  }

  return (
    <div id="friends" className="w-full">
      {user.friends.length > 0 ? (
        user.friends.map((friend: any) => (
          <div
            key={friend._id}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            <div className="flex relative items-center space-x-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image width={40} height={40} src={friend.image!} alt="" />
              </div>
              <span className="text-lg font-medium">{friend.name}</span>
            </div>
            {isUserProfile && (
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 text-sm font-medium text-red-500 bg-white rounded-full border border-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => handleDeleteFriend(friend._id)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600"
                  onClick={() => handleStartChat(friend._id)}
                >
                  Private Chat
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
