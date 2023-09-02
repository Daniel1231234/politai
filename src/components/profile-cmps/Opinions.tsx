import React, { useEffect, useState } from "react"
import OpinionItem from "./OpinionItem"
import EmptyState from "../EmptyState"
import AddOpinionModal from "../AddOpinionModal"
import Button from "../Button"

interface OpinionsProps {
  user: any
  isUserProfile: boolean
}

const Opinions: React.FC<OpinionsProps> = ({ user, isUserProfile }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {user.opinions.length > 0 ? (
        <div className="relative grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto p-6 pt-12">
          {isUserProfile && (
            <Button
              onClick={() => setIsOpen(true)}
              className="absolute top-0 right-2 z-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
            >
              Create New Opinion
            </Button>
          )}
          {user.opinions.map((opinion: any) => (
            <div
              key={opinion._id}
              className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl"
            >
              <OpinionItem
                item={opinion}
                img={user.image!}
                creatorName={user.name!}
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
      <AddOpinionModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
    </>
  )
}

export default Opinions
