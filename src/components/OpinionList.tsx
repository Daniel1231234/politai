"use client"

import toast from "react-hot-toast"
import React, { useEffect, useState } from "react"
import OpinionPreview from "./OpinionPreview"
import EmptyState from "./EmptyState"
import AddOpinionModal from "./AddOpinionModal"
import axios from "axios"
import { User } from "next-auth"

interface OpinionListProps {
  initialOpinions: any
  user: User
  userFriends: any
}

const OpinionList: React.FC<OpinionListProps> = ({
  initialOpinions,
  user,
  userFriends,
}) => {
  const [opinions, setOpinions] = useState<any[]>(initialOpinions)
  const [isAdding, setIsAdding] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onAddFriend = async (senderUser: User) => {
    setIsAdding(true)
    try {
      const { data } = await axios.post("/api/friends/add", {
        senderUserId: senderUser._id,
      })

      if (!data.success) {
        toast.error(data.message)
        return
      }
      if (data.success) {
        toast.success(`Friend request sent`)
      }
    } catch (error: any) {
      console.log(error)
      toast.error("Something went wrong!")
      throw error
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <>
      <section className="mt-12 md:px-8">
        {opinions.length === 0 && (
          <EmptyState
            title="No Opinions Yet"
            description="You haven't shared any opinions yet. Want to start?"
            buttonLabel="Create New Opinion"
            onButtonClick={() => setIsOpen(true)}
          />
        )}
        <div className="flex flex-col gap-8 mt-8 w-full">
          {opinions.map((opinion) => {
            const isFriend = userFriends.some(
              (friend: any) => friend._id === opinion.creator._id
            )

            const isUserOpinion = opinion.creator._id === user._id

            return (
              <OpinionPreview
                key={opinion._id}
                opinion={opinion}
                isFriends={isFriend}
                isUserOpinion={isUserOpinion}
                onAddFriend={onAddFriend}
                user={user}
              />
            )
          })}
        </div>
      </section>
      <AddOpinionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        username={user.name}
      />
    </>
  )
}

export default OpinionList
