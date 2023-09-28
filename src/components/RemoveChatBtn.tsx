"use client"

import React from "react"
import { FaTrashAlt } from "react-icons/fa"
import { deleteChat } from "@/actions"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface RemoveChatBtnProps {
  chatId: string
}

const RemoveChatBtn: React.FC<RemoveChatBtnProps> = ({ chatId }) => {
  const router = useRouter()
  const handleDeleteChat = async () => {
    const res = await deleteChat(chatId)
    if (res.success) {
      toast.success("Chat deleted successfully")
    }
    router.refresh()
  }

  return (
    <button
      onClick={handleDeleteChat}
      className="absolute right-16 inset-y-0 flex items-center z-10 hover:text-red-500"
    >
      <FaTrashAlt className="h-5 w-5" />
    </button>
  )
}

export default RemoveChatBtn
