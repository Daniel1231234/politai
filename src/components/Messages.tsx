"use client"

import { useEffect, useRef, useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { pusherClient } from "@/lib/pusher"
import { Message } from "@/types"
import ImgContainer from "./ImgContainer"
import { useContextMenu } from "react-contexify"
import ContextMenu from "./ContextMenu"
import toast from "react-hot-toast"
import { removeChatMessage } from "@/actions"
import "react-contexify/ReactContexify.css"
import { User } from "next-auth"

interface MessagesProps {
  chatMessages: Message[]
  chatPartnerId: string
  user: User
  chatId: string
}

interface ItemClickActions {
  id: string
  event: React.MouseEvent
  props: { message: Message }
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
  const [isSameUser, setIsSameUser] = useState<boolean>(false)
  const scrollDownRef = useRef<HTMLDivElement | null>(null)
  const { show } = useContextMenu({ id: "blabla" })

  useEffect(() => {
    pusherClient.subscribe(chatId)

    const addMessage = (message: Message) => {
      if (message.chatId === chatId) {
        setMessages((prev) => [message, ...prev])
      }
    }

    const removeMessage = (messageId: string) => {
      const msgs = messages.filter((msg) => msg.id !== messageId)
      setMessages(msgs)
    }

    pusherClient.bind("incoming-message", addMessage)
    pusherClient.bind("delete-message", removeMessage)

    return () => {
      pusherClient.unsubscribe(chatId)
      pusherClient.unbind("incoming_message", addMessage)
      pusherClient.unbind("delete-message", removeMessage)
    }
  }, [chatId])

  function handleContextMenu(
    event: React.MouseEvent,
    message: Message,
    isCurrUser: boolean
  ) {
    setIsSameUser(isCurrUser)
    show({
      event,
      props: {
        message,
        isCurrUser,
      },
    })
  }

  const handleItemClick = async ({ id, event, props }: ItemClickActions) => {
    switch (id) {
      case "copy":
        const txt = props.message.content
        if (!txt) return
        try {
          await navigator.clipboard.writeText(txt)
          toast.success("Text copied to clipboard")
        } catch (err) {
          toast.error("Failed to copy text")
        }
        break
      case "remove":
        const { message } = props
        const res = await removeChatMessage(chatId, message.id)
        if (res?.sucess) {
          toast.success(res.message)
        }
        break
    }
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
              onContextMenu={(e) => handleContextMenu(e, message, isCurrUser)}
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
        <ContextMenu
          handleItemClick={handleItemClick}
          isSameUser={isSameUser}
        />
      </div>
    </>
  )
}

export default Messages
