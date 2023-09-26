import React from "react"
import OpinionPreview from "./OpinionPreview"
import EmptyState from "./EmptyState"
import { User } from "next-auth"
import { Opinion } from "@/types"
import { getInitialOpinions, getUserFriends } from "@/actions"

interface OpinionListProps {
  user: User
}

const OpinionList = async ({ user }: OpinionListProps) => {
  const initialOpinionsData = getInitialOpinions()
  const userFriendsData = getUserFriends(user._id)

  const [initialOpinions, userFriends] = await Promise.all([
    initialOpinionsData,
    userFriendsData,
  ])

  return (
    <>
      <section className="mt-12 md:px-8">
        {initialOpinions.length === 0 && (
          <EmptyState
            title="No Opinions Yet"
            description="You haven't shared any opinions yet. Want to start?"
            buttonLabel=""
          />
        )}
        <div className="flex flex-col gap-8 mt-8 w-full">
          {initialOpinions.map((opinion: Opinion) => {
            const isFriend = userFriends.some(
              (friend: User) => friend._id === opinion.creator._id
            )

            const isUserOpinion = opinion.creator._id === user._id

            return (
              <OpinionPreview
                key={opinion._id}
                opinion={opinion}
                isFriends={isFriend}
                isUserOpinion={isUserOpinion}
                user={user}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}

export default OpinionList
