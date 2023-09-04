"use client"

import { cn, formatedDistance, toPusherKey } from "@/lib/utils"
import Button from "./Button"
import Divider from "./Divider"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import TextareaAutosize from "react-textarea-autosize"
import { Like } from "@/types"
import { BsX, BsHeart, BsHeartFill, BsFillXCircleFill } from "react-icons/bs"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { FiUserPlus } from "react-icons/fi"
import { IoIosSend } from "react-icons/io"
import { UserDocument } from "@/models/user"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"
import { BiMessageSquareAdd } from "react-icons/bi"
import { CldImage } from "next-cloudinary"
import { CommentDocument } from "@/models/comment"

interface OpinionPreviewProps {
  opinion: any
  isFriends: boolean
  isUserOpinion?: boolean
  onAddFriend: (userToAdd: UserDocument) => Promise<void>

  user: UserDocument
}

const OpinionPreview: React.FC<OpinionPreviewProps> = ({
  opinion,
  isFriends,
  isUserOpinion,
  onAddFriend,

  user,
}) => {
  const router = useRouter()
  const [isOpenComments, setIsOpenComments] = useState<boolean>(false)
  const [commentText, setCommentText] = useState<string>("")
  const [opinionComments, setOpinionComments] = useState<any[]>(
    opinion.comments
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [opinionLikes, setOpinionLikes] = useState<Like[]>(opinion.likes)

  const opinionRef = useRef<HTMLDivElement | null>(null)

  const handleCloseComments = () => setIsOpenComments(false)

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
    setIsLoading(true)
    try {
      const res = await fetch(`/api/opinion/comment/${opinion._id}`, {
        method: "DELETE",
        body: JSON.stringify(commentid),
      }).then((res) => res.json())
      console.log(res)
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewLike = async () => {
    try {
      console.log(opinion)
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <div
        ref={opinionRef}
        className="relative bg-white shadow-md rounded-lg p-4 w-full"
      >
        <div className="flex justify-between">
          <div></div>
          <div className=" flex items-center space-x-1 ">
            {!isFriends && !isUserOpinion && (
              <button
                onClick={() => onAddFriend(opinion.creator)}
                className="text-gray-500 "
              >
                <FiUserPlus className="w-10 h-10 p-2 hover:bg-gray-200 cursor-pointer rounded" />
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex">
            <Image
              width={48}
              height={48}
              className="rounded-full"
              src={opinion.creator.image}
              alt="User Profile"
            />
            <div className="ml-2 cursor-pointer">
              <span className="block font-semibold text-lg text-black">
                {opinion.creator.name}
              </span>
              <span className="block text-sm text-gray-500">
                {formatedDistance(opinion.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <p className="text-lg mb-2">{opinion?.body}</p>

        {opinion.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            {opinion.images.map((publicId: string, idx: number) => (
              <div key={idx} className="rounded-lg overflow-hidden">
                <CldImage width="300" height="300" src={publicId} alt="" />
              </div>
            ))}
          </div>
        )}

        <Divider className="my-2" />

        <div className="flex justify-between mt-3">
          <div className="flex gap-1 items-center text-blue-600">
            <FaThumbsUp />
            <span>{opinion.likes.length}</span>
          </div>
          <div className="flex gap-1 items-center text-gray-600">
            <BiMessageSquareAdd />
            <span> {opinion.comments.length}</span>
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
            <FaThumbsUp />
            <span>Like</span>
          </Button>
          <Button
            onClick={() => setIsOpenComments(!isOpenComments)}
            type="button"
            title="comment"
            size="sm"
            variant="ghost"
            className="flex items-center gap-1 font-normal flex-1"
          >
            <BiMessageSquareAdd />
            <span>Comment</span>
          </Button>
        </div>

        <Divider className="my-2" />

        {isOpenComments && (
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

            <div className="commentsContainer mt-4 space-y-4">
              {opinion.comments?.map((comment: CommentDocument) => (
                <div
                  key={comment._id}
                  className="mb-4 relative  bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  {user._id === comment.creator._id && (
                    <button
                      onClick={(e) => handleDeleteComment(e, comment._id)}
                      className="absolute top-2 right-2 p-1 text-gray-500 hover:bg-gray-50 hover:rounded-full"
                      title="delete comment"
                      type="button"
                    >
                      <BsX className="h-4 w-4 font-thin text-gray-500" />
                    </button>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
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

                  <div className="flex items-center gap-2 mt-2">
                    <button className="text-gray-500 hover:text-gray-900">
                      {comment.likes.includes(user._id) ? (
                        <FaThumbsUp className="h-4 w-4" />
                      ) : (
                        <FaThumbsUp className="h-4 w-4" />
                      )}
                    </button>
                    <span>{comment.likes.length}</span>

                    <button className="text-gray-500 hover:text-gray-900 ml-4">
                      <FaThumbsDown className="h-4 w-4" />
                    </button>
                    <span>{comment.dislikes.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default OpinionPreview
