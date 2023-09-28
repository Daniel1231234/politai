"use client"

import { toast } from "react-hot-toast"
import { FC, useEffect, useRef, useState } from "react"
import { format } from "date-fns"
import { FaTrash } from "react-icons/fa"
import { cn, toPusherKey } from "@/lib/utils"
import { pusherClient } from "@/lib/pusher"
import { Message } from "@/types"
import ImgContainer from "./ImgContainer"
import { useContextMenu } from "@/hooks/useContextMenu"
import ContextMenu from "./ContextMenu"
import { useWindowSize } from "@/hooks/useWindowSize"

interface MessagesProps {
  chatMessages: any
  chatPartnerId: string
  user: any
  chatId: string
}

const formatTimeStamp = (timestamp: number) => {
  return format(timestamp, "HH:mm")
}

const Messages: React.FC<MessagesProps> = ({
  chatMessages,
  chatPartnerId,
  user,
  chatId,
}) => {
  const [messages, setMessages] = useState<Message[]>(chatMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const scrollDownRef = useRef<HTMLDivElement | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const { clicked, setClicked, coords, setCoords } = useContextMenu()
  const windowSize = useWindowSize()

  useEffect(() => {
    pusherClient.subscribe(chatId)

    const messageHandler = (message: Message) => {
      if (message.chatId === chatId) {
        setMessages((prev) => [message, ...prev])
      }
    }

    pusherClient.bind("incoming-message", messageHandler)

    return () => {
      pusherClient.unsubscribe(chatId)
      pusherClient.unbind("incoming_message", messageHandler)
    }
  }, [chatId])

  const removeMsg = async () => {
    try {
      toast.success("Message removed successfully")
    } catch (err) {
      console.log(err)
    }
  }

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    message: Message
  ) => {
    e.preventDefault()

    const menuWidth = 256

    let left = e.pageX

    if (e.pageX + menuWidth > windowSize.width) {
      left = e.pageX - menuWidth
    }

    setSelectedMessage(message)
    setClicked(true)
    setCoords({ x: e.pageX, y: e.pageY })
  }

  return (
    <>
      <div
        id="messages"
        className="flex dark:bg-bg-chat h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        <div ref={scrollDownRef} />

        {messages?.map((message, idx) => {
          const isCurrUser = message.sender._id === user._id
          const isImageMessage = false
          const isHebrew = /[\u0590-\u05FF]/.test(message.content)
          const hasNextMessageFromSameUser =
            messages[idx - 1]?.sender._id === messages[idx].sender._id

          return (
            <div
              key={message.id}
              onContextMenu={(e) => handleContextMenu(e, message)}
            >
              <div
                className={cn("flex items-end", { "justify-end": isCurrUser })}
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
                    <ImgContainer publicId={message.content} />
                  ) : (
                    <div
                      className={cn(
                        "relative px-4 py-2 rounded-lg flex justify-between gap-2",
                        {
                          "bg-indigo-600 text-white": isCurrUser,
                          "bg-gray-300 text-gray-800": !isCurrUser,
                          "rounded-br-none":
                            !hasNextMessageFromSameUser && isCurrUser,
                          "rounded-bl-none":
                            !hasNextMessageFromSameUser && !isCurrUser,
                          "text-left": !isHebrew,
                          "text-right": isHebrew,
                        }
                      )}
                    >
                      <span className="sm:text-md text-sm">
                        {message.content}
                      </span>
                      <div className="text-xs text-gray-400">
                        {formatTimeStamp(message.createdAt)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {clicked && selectedMessage && (
          <ContextMenu top={0} left={0} message={selectedMessage} />
        )}
      </div>
    </>
  )
}

export default Messages
