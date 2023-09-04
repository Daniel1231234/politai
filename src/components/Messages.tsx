"use client"

import { toast } from "react-hot-toast"
import { FC, useEffect, useRef, useState } from "react"
import { format } from "date-fns"
import Image from "next/image"
import { cn, toPusherKey } from "@/lib/utils"

interface MessagesProps {}

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
  isWiderScreen: false,
}

const Messages: React.FC<MessagesProps> = ({}) => {
  const [messages, setMessages] = useState<any[]>([])
  const [contextMenu, setContextMenu] = useState(initialContextMenu)
  const [msg, setMsg] = useState({ id: "", text: "" })
  const scrollDownRef = useRef<HTMLDivElement | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  const openMenu = (
    e: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    message: any
  ) => {
    e.preventDefault()
    const { pageX, pageY } = e
    const windowSize = window.innerWidth

    setMsg(message)

    if (pageX + 220 > windowSize) {
      setContextMenu({ show: true, x: pageX, y: pageY, isWiderScreen: true })
    } else {
      setContextMenu({ show: true, x: pageX, y: pageY, isWiderScreen: false })
    }
  }

  const removeMsg = async () => {
    try {
      //   await axios.post("/api/message/remove", {
      //     message: msg,
      //     chatId,
      //   })
      toast.success("Message removed successfully")
    } catch (err) {
      console.log(err)
    }
  }

  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(msg.text)
      toast.success("Text copied to clipboard")
    } catch (error) {
      console.error("Failed to copy text: ", error)
      toast.error("Failed to copy text")
    }
  }

  const closeContextMenu = () => setContextMenu(initialContextMenu)

  return (
    <div
      id="messages"
      className="flex dark:bg-bg-chat h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrollDownRef} />
    </div>
  )
}

export default Messages
