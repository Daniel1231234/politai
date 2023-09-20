"use client"

import React from "react"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { usePathname, useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { UserDocument } from "@/models/user"

interface ProfileHeaderProps {
  user: UserDocument
  isUserProfile: boolean
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isUserProfile,
}) => {
  const router = useRouter()
  return (
    <div id="profile-top" className="flex flex-col items-center mt-4 ">
      <div className="relative cursor-pointer flex items-center">
        <Image
          src={user?.image!}
          alt="user profile"
          width={150}
          height={150}
          className="rounded-full opacity-90 hover:opacity-100"
        />
      </div>
      <div className="flez flex-col justify-between items-center">
        <h2 className="font-bold text-3xl">{user.name}</h2>
        <p className="text-[#65676B]">{user.friends.length} friends</p>
        <p className="text-[#65676B] text-sm">
          Join Politai at
          <span className="font-semibold">
            {" "}
            {formatDate(user.createdAt ?? new Date())}
          </span>
        </p>
      </div>
      <div className="w-full border border-gray-200" />
    </div>
  )
}

export default ProfileHeader
