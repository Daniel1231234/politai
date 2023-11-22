"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { Transition } from "@headlessui/react"
import { User } from "next-auth"
import ImageModal from "./ImageModal"

interface ProfileHeaderProps {
  user: ExtendedUser
  isUserProfile: boolean
}

interface ExtendedUser extends User {
  friends: User[]
  createdAt: any
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isUserProfile,
}) => {
  const router = useRouter()
  const [isOpenImage, setIsOpenImage] = useState(false)

  const ProfileImage = (
    <Image
      onClick={() => setIsOpenImage(true)}
      src={user?.image!}
      alt="user profile"
      width={150}
      height={150}
      className="rounded-full transition-transform transform hover:scale-105"
    />
  )

  return (
    <>
      <div
        id="profile-top"
        className="flex gap-4 items-center justify-center my-4 "
      >
        <div className="relative cursor-pointer flex items-center">
          {ProfileImage}
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-3xl">{user.name}</h2>
          <p className="text-[#65676B]">{user.friends.length} friends</p>
          <p className="text-[#65676B] text-sm">
            Join Politai at
            <span className="font-semibold ml-1">
              {user.createdAt && formatDate(user.createdAt)}
            </span>
          </p>
        </div>
      </div>
      <ImageModal
        isShowing={isOpenImage}
        setIsShowing={setIsOpenImage}
        src={user.image}
      />
    </>
  )
}

export default ProfileHeader
