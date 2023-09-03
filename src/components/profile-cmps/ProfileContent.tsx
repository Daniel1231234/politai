"use client"

import React, { useState } from "react"
import Button from "../Button"
import About from "./About"
import Friends from "./Friends"
import Opinions from "./Opinions"
import { UserDocument } from "@/models/user"

interface ProfileContentProps {
  user: UserDocument
  isUserProfile: boolean
}

type Variant = "OPINIONS" | "ABOUT" | "FRIENDS"

const ProfileContent: React.FC<ProfileContentProps> = ({
  user,
  isUserProfile,
}) => {
  const [variant, setVariant] = useState<Variant>("OPINIONS")

  const content = () => {
    if (variant === "ABOUT") return <About user={user} />
    if (variant === "FRIENDS")
      return <Friends user={user} isUserProfile={isUserProfile} />
    if (variant === "OPINIONS")
      return <Opinions user={user} isUserProfile={isUserProfile} />
  }

  return (
    <div className="border-b ">
      <div className="flex shadow-sm" id="profile-btns-actions">
        <Button
          onClick={() => setVariant("OPINIONS")}
          variant="ghost"
          className="!bg-inherit hover:!bg-gray-200 hover:!text-blue-500"
        >
          Opinios
        </Button>
        <Button
          onClick={() => setVariant("ABOUT")}
          variant="ghost"
          className="!bg-inherit hover:!bg-gray-200 hover:!text-blue-500"
        >
          About
        </Button>
        <Button
          onClick={() => setVariant("FRIENDS")}
          variant="ghost"
          className="!bg-inherit hover:!bg-gray-200 hover:!text-blue-500"
        >
          Friends
        </Button>
      </div>
      {content()}
    </div>
  )
}

export default ProfileContent
