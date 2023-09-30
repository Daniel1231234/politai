import React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AddFriendButton from "@/components/AddFriendButton"
import { FriendRequest } from "@/types"
import Divider from "@/components/Divider"
import ProfileHeader from "@/components/ProfileHeader"
import ProfileContent from "@/components/profile-cmps/ProfileContent"
import { User } from "next-auth"
import { getUserById, getUserFriends, getUserOpinions } from "@/actions"

interface ProfilePageProps {
  params: {
    userId: string
  }
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth")

  const friends: User[] = await getUserFriends(session.user._id)

  const user = await getUserById(params.userId)

  if (!user) throw new Error("No user found")

  const isUserProfile = session.user._id === user._id

  const opinions = await getUserOpinions(params.userId)

  const isAlreadyFriends = user.friends.some(
    (friend: any) => friend._id === session.user._id
  )

  const isAlreadyFriendRequest = user.friendRequests.some(
    (fr: FriendRequest) => fr.senderId === session.user._id
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
      <ProfileContent
        user={user}
        isUserProfile={isUserProfile}
        opinions={opinions}
        friends={friends}
        sessionId={session.user._id}
        username={session.user.name}
      />
    </div>
  )
}

export default ProfilePage
