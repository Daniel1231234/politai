"use client"

import { toast } from "react-hot-toast"
import { FC, useEffect, useRef, useState } from "react"
import { format } from "date-fns"
import Image from "next/image"
import { cn, toPusherKey } from "@/lib/utils"
import { pusherClient } from "@/lib/pusher"
import { CldImage } from "next-cloudinary"
import { Message } from "@/types"

interface MessagesProps {
  chatMessages: any
  chatPartnerId: string
  user: any
  chatId: string
}

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
  isWiderScreen: false,
}

const Messages: React.FC<MessagesProps> = ({
  chatMessages,
  chatPartnerId,
  user,
  chatId,
}) => {
  const [messages, setMessages] = useState<Message[]>(chatMessages)
  const [contextMenu, setContextMenu] = useState(initialContextMenu)
  const [msg, setMsg] = useState({ id: "", text: "" })
  const scrollDownRef = useRef<HTMLDivElement | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    pusherClient.subscribe(chatId)

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev])
    }

    pusherClient.bind("incoming-message", messageHandler)

    return () => {
      pusherClient.unsubscribe(chatId)
      pusherClient.unbind("incoming_message", messageHandler)
    }
  }, [chatId])

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

      {messages?.map((message, idx) => {
        const isCurrUser = message.sender._id === user._id
        const isImageMessage = false
        const hasNextMessageFromSameUser =
          messages[idx - 1]?.sender._id === messages[idx].sender._id

        const formatTimeStamp = (timestamp: number) => {
          return format(timestamp, "HH:mm")
        }

        return (
          <div key={message.id}>
            <div
              className={cn("flex items-end", {
                "justify-end": isCurrUser,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrUser,
                    "order-2 items-start": !isCurrUser,
                  }
                )}
              >
                {isImageMessage ? (
                  <div
                    onContextMenu={(e) => openMenu(e, message)}
                    className="w-60 h-44 relative"
                  >
                    <CldImage
                      src={msg.text}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    />
                    <span className="ml-2 text-sm text-gray-400">
                      {formatTimeStamp(message.createdAt)}
                    </span>
                  </div>
                ) : (
                  <div
                    onContextMenu={(e) => openMenu(e, msg)}
                    className={cn(" px-4 py-2 rounded-lg inline-block", {
                      "bg-indigo-600 text-white ": isCurrUser,
                      "bg-gray-200 text-gray-900  ": !isCurrUser,
                      "rounded-br-none":
                        !hasNextMessageFromSameUser && isCurrUser,
                      "rounded-bl-none":
                        !hasNextMessageFromSameUser && !isCurrUser,
                    })}
                  >
                    <span className="ml-2">{message.content}</span>
                    <span className="ml-2 text-sm text-gray-400">
                      {formatTimeStamp(message.createdAt)}
                    </span>
                  </div>
                )}
              </div>

              <div
                className={cn("relative w-6 h-6", {
                  "order-2": isCurrUser,
                  "order-1": !isCurrUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              ></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Messages
