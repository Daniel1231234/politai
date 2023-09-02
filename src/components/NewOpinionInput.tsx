"use client"

import Image from "next/image"
import React, { useState } from "react"
import AddOpinionModal from "./AddOpinionModal"

interface NewOpinionInputProps {
  user: any
}

const NewOpinionInput: React.FC<NewOpinionInputProps> = ({ user }) => {
  let [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <div className="flex gap-4 w-full max-w-md mx-auto my-5">
        <div className="relative">
          <Image
            src={user?.image!}
            alt="profile"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div
          onClick={() => setIsOpen(true)}
          className="flex flex-1 items-center px-3 py-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer"
        >
          <span className="text-gray-700">
            Share your opinion, {user?.name}
          </span>
        </div>
      </div>

      <AddOpinionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user as any}
      />
    </>
  )
}

export default NewOpinionInput
