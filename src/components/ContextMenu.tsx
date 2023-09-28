"use client"

import { Message } from "@/types"
import React, { useState, useEffect } from "react"
import { FaTrash, FaCopy } from "react-icons/fa"

interface ContextMenuProps {
  top: number
  left: number
  message: Message
}

const ContextMenu: React.FC<ContextMenuProps> = ({ top, left, message }) => {
  return (
    <div
      style={{ position: "absolute", top: `${top}px`, left: `${left}px` }}
      className="w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div
        onClick={() => console.log(message)}
        className="cursor-pointer hover:bg-gray-100 text-gray-700 flex items-center justify-between px-4 py-2"
      >
        <span className="text-sm">Delete</span>
        <FaTrash className="text-gray-400 hover:text-gray-600" />
      </div>
      <div className="border-t border-gray-100"></div>
      <div className="cursor-pointer hover:bg-gray-100 text-gray-700 flex items-center justify-between px-4 py-2">
        <span className="text-sm">Copy</span>
        <FaCopy className="text-gray-400 hover:text-gray-600" />
      </div>
    </div>
  )
}

export default ContextMenu
