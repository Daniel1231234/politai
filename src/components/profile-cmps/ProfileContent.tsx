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
  opinions: any
  friends: any
  sessionId: string
  username: string
}

type Variant = "OPINIONS" | "ABOUT" | "FRIENDS"

const ProfileContent: React.FC<ProfileContentProps> = ({
  user,
  isUserProfile,
  friends,
  sessionId,
  opinions,
  username,
}) => {
  const [variant, setVariant] = useState<Variant>("OPINIONS")

  const userDetails = {
    email: user.email,
    birthday: user.birthday,
    location: user.location,
    religion: user.religion,
    phone: user.phone,
    gender: user.gender,
    ideology: user.ideology,
  }

  const content = () => {
    switch (variant) {
      case "ABOUT":
        return <About user={user} />
      case "FRIENDS":
        return (
          <Friends
            friends={friends}
            isUserProfile={isUserProfile}
            sessionId={sessionId}
          />
        )
      case "OPINIONS":
        return (
          <Opinions
            isUserProfile={isUserProfile}
            opinions={opinions}
            username={username}
            userId={user._id.toString()}
          />
        )
    }
  }

  return (
    <div className="border-b mx-2 ">
      <div className="flex shadow-sm" id="profile-btns-actions">
        <Button
          onClick={() => setVariant("ABOUT")}
          variant="ghost"
          className="!bg-inherit hover:!bg-gray-200 hover:!text-blue-500"
        >
          About
        </Button>
        <Button
          onClick={() => setVariant("OPINIONS")}
          variant="ghost"
          className="!bg-inherit hover:!bg-gray-200 hover:!text-blue-500"
        >
          Opinions
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
