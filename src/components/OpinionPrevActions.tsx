"use client"

import { useEffect } from "react"
import Button from "./Button"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"
import { BiMessageSquareAdd } from "react-icons/bi"
import { Comment, Like } from "@/types"
import { cn } from "@/lib/utils"
import axios from "axios"
import toast from "react-hot-toast"

interface OpinionPrevActionsProps {
  opinionLikes: Like[]
  opinionComments: Comment[]
  userId: string
  opinionId: string
}

const OpinionPrevActions: React.FC<OpinionPrevActionsProps> = ({
  opinionLikes,
  opinionComments,
  userId,
  opinionId,
}) => {
  return (
    <>
      <div className="flex justify-between mt-3">
        <div
          className={`flex gap-1 items-center ${cn({
            "text-blue-600": opinionLikes.some(
              (like: Like) => like.creator === userId
            ),
          })} `}
        >
          <FaThumbsUp />
          <span>{opinionLikes.length}</span>
        </div>
        <div className="flex gap-1 items-center text-gray-600">
          <BiMessageSquareAdd />
          <span> {opinionComments.length}</span>
        </div>
      </div>
    </>
  )
}

export default OpinionPrevActions
