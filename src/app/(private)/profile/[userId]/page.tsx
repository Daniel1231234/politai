import React from "react"
import { notFound, redirect } from "next/navigation"
import UserModel from "../../../../models/user"
import { getServerSession } from "next-auth"
import { authOptios } from "@/app/api/auth/[...nextauth]/route"
import AddFriendButton from "@/components/AddFriendButton"
import { FriendRequest } from "@/types"
import Divider from "@/components/Divider"
import ProfileHeader from "@/components/ProfileHeader"
import ProfileContent from "@/components/profile-cmps/ProfileContent"

interface ProfilePageProps {
  params: {
    userId: string
  }
}

async function getUserById(userId: string) {
  try {
    return await UserModel.findById({ _id: userId })
      .populate("opinions")
      .populate("friends")
  } catch (error) {
    throw error
  }
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const session = await getServerSession(authOptios)
  if (!session) return notFound()

  const user = await JSON.parse(
    JSON.stringify(await getUserById(params.userId))
  )

  if (!user) throw new Error("No user found")

  const isUserProfile = session.user.id === user._id

  const isAlreadyFriends = user.friends.some(
    (friend: any) => friend._id === session.user.id
  )

  const isAlreadyFriendRequest = user.friendRequests.some(
    (fr: FriendRequest) => fr.senderId === session.user.id
  )

  return (
    <div className=" bg-white flex relative flex-col">
      {!isAlreadyFriends && !isUserProfile && (
        <AddFriendButton
          userToAdd={user}
          isAlreadyFriendRequest={isAlreadyFriendRequest}
        />
      )}
      <ProfileHeader user={user} isUserProfile={isUserProfile} />
      <Divider />
      <ProfileContent user={user} isUserProfile={isUserProfile} />
    </div>
  )
}

export default ProfilePage
