"use client"

import { cn, formatedDistance, toPusherKey } from "@/lib/utils"
import Button from "./Button"
import Divider from "./Divider"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import TextareaAutosize from "react-textarea-autosize"
import { Like } from "@/models/extra"
import { BsX } from "react-icons/bs"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { AiOutlineUserAdd } from "react-icons/ai"
import { IoIosSend } from "react-icons/io"

interface OpinionPreviewProps {
  opinion: any
  isFriends: boolean
  isUserOpinion?: boolean
  onHide: (opinion: any) => void
  onAddFriend: (userToAdd: any) => Promise<void>
  isHidden: boolean
  handleUndo: any
  user: any
}

const OpinionPreview: React.FC<OpinionPreviewProps> = ({
  opinion,
  isFriends,
  onHide,
  isUserOpinion,
  onAddFriend,
  isHidden,
  handleUndo,
  user,
}) => {
  const router = useRouter()
  const [openComments, setOpenComments] = useState<boolean>(false)
  const [commentText, setCommentText] = useState<string>("")
  const [opinionComments, setOpinionComments] = useState<any[]>(
    opinion.comments
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [opinionLikes, setOpinionLikes] = useState<Like[]>(opinion.likes)

  const opinionRef = useRef<HTMLDivElement | null>(null)

  const handleCloseComments = () => setOpenComments(false)

  useOnClickOutside(opinionRef, handleCloseComments)

  const handleNewComment = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch(`/api/opinion/comment/${opinion._id}`, {
        method: "POST",
        body: JSON.stringify(commentText),
      }).then((res) => res.json())
      console.log(res)
      setCommentText("")
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteComment = async (
    e: React.MouseEvent<HTMLButtonElement>,
    commentid: string
  ) => {
    e.stopPropagation()
    try {
      //   await axios.delete(`/api/opinion/${opinion.id}/comment/${commentid}`)
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  const handleNewLike = async () => {
    try {
      const isUserAllreadyLike = opinionLikes.some(
        (like) => like.creator.id === user._id
      )
      if (isUserAllreadyLike) return

      const newLike = {
        id: "id" + Math.random().toString(16).slice(2),
        creator: { name: user.name, id: user._id },
      }
      console.log(newLike)
      //   await axios.post(`/api/opinion/${opinion.id}/like`, newLike)
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div
      className="opinion-container px-5 py-4 relative bg-white shadow rounded-lg w-full"
      ref={opinionRef}
    >
      {!isHidden ? (
        <>
          <div className="flex items-center gap-1 absolute top-2 right-2">
            {!isFriends && !isUserOpinion && (
              <button
                className=" text-gray-500 hover:bg-gray-50 hover:rounded-full"
                onClick={() => onAddFriend(opinion.creator._id)}
              >
                <AiOutlineUserAdd className="h-8 w-8 cursor-pointer" />
              </button>
            )}
            <button
              onClick={() => onHide(opinion)}
              className={` text-gray-500 hover:bg-gray-50 hover:rounded-full`}
              title="close"
              type="button"
            >
              <BsX className="h-10 w-10 cursor-pointer" />
            </button>
          </div>
          <div className="user-profile-section relative flex mb-4">
            <Image
              width={48}
              height={48}
              className="rounded-full"
              src={opinion.creator.image}
              alt="User Profile"
            />
            <div
              className="ml-2 mt-0.5 cursor-pointer"
              onClick={() => router.push(`/profile/${opinion.creator._id}`)}
            >
              <span className="block font-medium text-base leading-snug text-black">
                {opinion?.creator.name}
              </span>
              <span className="block text-sm text-gray-500 font-light leading-snug">
                {formatedDistance(opinion.createdAt)}
              </span>
            </div>
          </div>

          <p className="opinion-text text-gray-800 leading-snug md:leading-normal">
            {opinion?.body}
          </p>

          <Divider className="my-2" />

          <div className="flex justify-between items-center">
            <div className="flex">
              {/* <ThumbsUpIcon className="p-1 rounded-full bg-blue-400 shadow-md text-white" /> */}
              <span className="ml-1 text-gray-500 font-light">
                {opinion.likes.length}
              </span>
            </div>
            <div className="flex">
              <p className="text-gray-600 text-sm font-light">
                {opinion.comments.length} comments
              </p>
            </div>
          </div>

          <Divider className="my-2" />

          <div className="flex items-center justify-between w-full">
            <Button
              onClick={() => handleNewLike()}
              title="like"
              size="sm"
              variant="ghost"
              className="flex items-center gap-1 font-normal flex-1"
            >
              {/* <ThumbsUpIcon /> */}
              <span>Like</span>
            </Button>
            <Button
              onClick={() => setOpenComments(true)}
              type="button"
              title="comment"
              size="sm"
              variant="ghost"
              className="flex items-center gap-1 font-normal flex-1"
            >
              {/* <MessageSquareIcon /> */}
              <span>Comment</span>
            </Button>
          </div>

          <Divider className="my-2" />
          {openComments && (
            <>
              <form
                className="flex gap-1 w-full items-center"
                onSubmit={handleNewComment}
              >
                <div className="relative w-6 h-6">
                  <Image
                    src={user.image!}
                    alt="profile"
                    fill
                    className="rounded-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <TextareaAutosize
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Submit your comment"
                  className="flex-1 items-center px-3 py-2 bg-gray-200 block rounded-full border-0 resize-none  cursor-pointer focus:ring-0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleNewComment(e)
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  isLoading={isLoading}
                  type="submit"
                  disabled={commentText.length === 0}
                >
                  <IoIosSend
                    className={
                      "h-8 w-8" +
                      cn({
                        "text-blue-500 h-8 w-8": commentText.length > 0,
                      })
                    }
                  />
                </Button>
              </form>
              <div className="commentsContainer mt-4">
                <Divider className="my-2" />
                {opinionComments?.map((comment) => (
                  <div key={comment.id} className="mb-4 relative">
                    {user._id === comment.creator._id && (
                      <button
                        onClick={(e) => handleDeleteComment(e, comment._id)}
                        className="absolute top-2 right-2 p-1 text-gray-500 hover:bg-gray-50 hover:rounded-full"
                        title="delete comment"
                        type="button"
                      >
                        <BsX className="h-4 w-4 font-thin" />
                      </button>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8">
                        <Image
                          src={comment?.creator.image!}
                          alt="Profile"
                          fill
                          className="rounded-full"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <span className="text-base font-medium">
                        {comment.creator.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center justify-between p-1">
          <div className="flex flex-col">
            <p>Opinion hidden</p>
            <p className="text-[10px] text-gray-500">
              {`You'll see fewer posts like this.`}
            </p>
          </div>
          <Button variant="ghost" onClick={() => handleUndo(opinion)}>
            Undo
          </Button>
        </div>
      )}
    </div>
  )
}

export default OpinionPreview
