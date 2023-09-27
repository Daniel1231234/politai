"use client"

import { FC, useEffect, useRef, useState } from "react"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"
import { CldUploadButton } from "next-cloudinary"
import TextareaAutosize from "react-textarea-autosize"
import Button, { buttonVariants } from "./Button"
import { toast } from "react-hot-toast"
import { BsFillImageFill, BsEmojiWink } from "react-icons/bs"
import { FaMicrophone } from "react-icons/fa"
import dynamic from "next/dynamic"
import axios from "axios"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import "regenerator-runtime/runtime"

interface ChatInputProps {
  dbFriend: any
  chatId: string
}

const ChatInput: React.FC<ChatInputProps> = ({ dbFriend, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [input, setInput] = useState<string>("")
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

  const chatInputRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(chatInputRef, () => setOpenEmojiPicker(false))

  const {
    transcript,
    finalTranscript,
    browserSupportsSpeechRecognition,
    resetTranscript,
    interimTranscript,
    listening,
  } = useSpeechRecognition()

  useEffect(() => {
    if (finalTranscript !== "") {
      SpeechRecognition.stopListening()
      setInput(finalTranscript)
    }
  }, [interimTranscript, finalTranscript])

  useEffect(() => {
    if (listening) {
      setInput(transcript)
    }
  }, [listening, transcript])

  const sendMessage = async () => {
    if (!input) return
    setIsLoading(true)
    try {
      const body = {
        chatId,
        content: input,
      }
      const { data } = await axios.post("/api/chat/message/send", body)
      if (data.success) {
        setInput("")
        textareaRef.current?.focus()
      }
    } catch (err) {
      toast.error("Something went wrong, Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmojiClick = (emoji: string) => {
    setInput((prev: string) => (prev += emoji))
    setOpenEmojiPicker(false)
  }

  const handleUpload = async (results: any) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const { data } = await axios.post("/api/chat/message/send", {
        chatId,
        content: results.info.secure_url,
      })
      if (data.success) {
        setInput("")
        textareaRef.current?.focus()
      }
    } catch (err) {
      toast.error(
        "Something went wrong with your image, Please try again later."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSpeechToText = () => {
    SpeechRecognition.startListening({ continuous: true, language: "he" })
    console.log(transcript)
  }

  if (!browserSupportsSpeechRecognition) {
    return null
  }
  return (
    <div
      className="border-t  border-gray-200  pt-4 sm:mb-0 "
      ref={chatInputRef}
    >
      {openEmojiPicker ? (
        <div></div>
      ) : (
        // <CustomEmojiPicker handleEmojiClick={handleEmojiClick} />
        <div className="relative overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
          <TextareaAutosize
            ref={textareaRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${dbFriend?.name}`}
            className="block w-full  resize-none border-0 bg-transparent  text-gray-900 placeholder:text-gray-400 placeholder:ml-3 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
          />

          <div
            onClick={() => textareaRef.current?.focus()}
            className="py-1  border-t-2"
            aria-hidden="true"
          >
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>

          <div className="absolute right-0 bottom-0 flex  justify-between py-2 pl-3 pr-2">
            <div className="flex-shrink-0 flex-row-reverse flex items-center justify-center gap-2 ">
              <Button
                size="sm"
                isLoading={isLoading}
                onClick={sendMessage}
                type="submit"
              >
                Post
              </Button>
              <Button
                onClick={handleSpeechToText}
                size="sm"
                variant="ghost"
                className="w-full cursor-pointer"
              >
                <FaMicrophone strokeWidth={2} color="gray" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                className="w-full cursor-pointer"
              >
                <BsEmojiWink strokeWidth={2} color="gray" />
              </Button>

              <div
                className={`relative ${buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}`}
              >
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onUpload={handleUpload}
                  uploadPreset="wz721uu6"
                  className="cursor-pointer"
                >
                  <BsFillImageFill strokeWidth={2} color="gray" />
                </CldUploadButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default dynamic(() => Promise.resolve(ChatInput), { ssr: false })
// export default ChatInput
