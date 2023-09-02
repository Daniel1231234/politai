"use client"

import toast from "react-hot-toast"
import React, { useEffect, useState } from "react"
import OpinionPreview from "./OpinionPreview"
import { OpinionDocument } from "@/models/opinion"

interface OpinionListProps {
  initialOpinions: any
  user: any
  userFriends: any
}

const OpinionList: React.FC<OpinionListProps> = ({
  initialOpinions,
  user,
  userFriends,
}) => {
  const [opinions, setOpinions] = useState<any[]>(initialOpinions)
  const [hiddenOpinions, setHiddenOpinions] = useState<any[]>([])
  const [isAdding, setIsAdding] = useState(false)

  const onAddFriend = async (senderUserId: any) => {
    setIsAdding(true)
    try {
      const res = await fetch("/api/friends/add", {
        method: "POST",
        body: JSON.stringify(senderUserId),
      }).then((res) => res.json())
      console.log(res)
      toast.success(`Friend request sent`)
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setIsAdding(false)
    }
  }

  const onHide = (opinionId: string) => {
    const opinion = opinions.find((op) => op._id === opinionId)
    if (!opinion) return
    setHiddenOpinions((prev) => [...prev, opinion])
  }

  const handleUndo = (opinion: OpinionDocument) => {
    const updatedOps = hiddenOpinions.filter((op) => op.id !== opinion._id)
    setHiddenOpinions(updatedOps)
  }

  return (
    <section className="mt-12 px-4 md:px-8">
      <div className="flex flex-col gap-8 mt-8 w-full">
        {opinions.map((opinion) => {
          const isFriend = userFriends.some(
            (friend: any) => friend._id === opinion.creator._id
          )

          const isUserOpinion = opinion.creator._id === user.id
          const isOpinionHidden = hiddenOpinions.some(
            (op) => op._id === opinion._id
          )

          return (
            <OpinionPreview
              key={opinion._id}
              opinion={opinion}
              isFriends={isFriend}
              isUserOpinion={isUserOpinion}
              onHide={onHide}
              isHidden={isOpinionHidden}
              onAddFriend={onAddFriend}
              handleUndo={handleUndo}
              user={user}
            />
          )
        })}
      </div>
    </section>
  )
}

export default OpinionList
