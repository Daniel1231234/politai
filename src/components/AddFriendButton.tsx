"use client"

import React, { useState } from "react"
import Button from "./Button"
import { toast } from "react-hot-toast"
import { FaUserPlus } from "react-icons/fa"
import useFriendRequests from "@/hooks/useFriendRequests"

interface AddFriendButtonProps {
  userToAdd: any
  isAlreadyFriendRequest: boolean
}

const AddFriendButton: React.FC<AddFriendButtonProps> = ({
  userToAdd,
  isAlreadyFriendRequest,
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const { addFriendRequest } = useFriendRequests()

  const onAddFriend = async () => {
    setIsAdding(true)
    try {
      const senderUserId = userToAdd._id
      const res = await fetch("/api/friends/add", {
        method: "POST",
        body: JSON.stringify(senderUserId),
      }).then((res) => res.json())

      if (res.success) {
        const newFriendRequest = res.newFriendRequest
        // addFriendRequest(newFriendRequest)
        toast.success(`Request sent to ${userToAdd.name}`)
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsAdding(false)
    }
  }
  return (
    <Button
      disabled={isAlreadyFriendRequest}
      size="lg"
      isLoading={isAdding}
      onClick={onAddFriend}
      className="!bg-transparent self-start hover:!bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent"
    >
      <FaUserPlus className="w-12 h-12" />
    </Button>
  )
}

export default AddFriendButton
