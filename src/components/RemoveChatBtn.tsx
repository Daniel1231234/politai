"use client"

import React from "react"
import { FaChevronRight, FaTrashAlt } from "react-icons/fa"

interface RemoveChatBtnProps {}

const RemoveChatBtn: React.FC<RemoveChatBtnProps> = ({}) => {
  return (
    <button className="absolute right-16 inset-y-0 flex items-center z-10 hover:text-red-500">
      <FaTrashAlt className="h-5 w-5" />
    </button>
  )
}

export default RemoveChatBtn
