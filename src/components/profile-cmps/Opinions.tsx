import React, { useEffect, useState } from "react"
import OpinionItem from "./OpinionItem"
import EmptyState from "../EmptyState"
import AddOpinionModal from "../AddOpinionModal"
import Button from "../Button"
import { UserDocument } from "@/models/user"

interface OpinionsProps {
  isUserProfile: boolean
  opinions: any
  username: string
}

const Opinions: React.FC<OpinionsProps> = ({
  username,
  isUserProfile,
  opinions,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {opinions.length > 0 ? (
        <div className="relative grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto p-6 pt-12">
          {isUserProfile && (
            <Button
              onClick={() => setIsOpen(true)}
              className="absolute top-0 right-2 z-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
            >
              Create New Opinion
            </Button>
          )}
          {opinions.map((opinion: any) => (
            <div
              key={opinion._id}
              className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl"
            >
              <OpinionItem
                item={opinion}
                img={opinion.creator.image!}
                creatorName={opinion.creator.name!}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-full p-6">
          <EmptyState
            title="No Opinions Yet"
            description="You haven't shared any opinions yet. Want to start?"
            buttonLabel="Create New Opinion"
            onButtonClick={() => setIsOpen(true)}
          />
        </div>
      )}
      <AddOpinionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        username={username}
      />
    </>
  )
}

export default Opinions
