"use server"

import { connectMongoDB } from "@/lib/db"
import ChatModel from "@/models/chat"
import OpinionModel from "@/models/opinion"
import UserModel from "@/models/user"

export async function getUsersById(userId: string, friendId: string) {
  await connectMongoDB()
  const res = await Promise.all([
    UserModel.findById({ _id: userId }, "_id name email image chats"),
    UserModel.findById({ _id: friendId }, "_id name email image chats role"),
  ])

  return JSON.parse(JSON.stringify(res))
}

export async function getUserById(userId: string) {
  try {
    await connectMongoDB()
    return await UserModel.findById({ _id: userId })
      .populate("opinions")
      .populate("friends")
  } catch (error) {
    throw error
  }
}

export async function getCurrChat(chatId: string) {
  try {
    await connectMongoDB()
    const chat = await ChatModel.findOne({ chatId })
    if (!chat) return
    return JSON.parse(JSON.stringify(chat))
  } catch (error) {
    throw error
  }
}

export async function getUserChats(userId: string) {
  try {
    await connectMongoDB()
    const user = await UserModel.findById({ _id: userId }).populate("chats")
    if (!user) return
    const chats = user.chats ?? []
    return JSON.parse(JSON.stringify(chats))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserOpinions(userId: string) {
  try {
    await connectMongoDB()
    const opinions = await OpinionModel.find({ creator: userId }).populate(
      "creator",
      "_id name image email role"
    )
    if (!opinions) throw new Error("No opinions found for this user")
    return JSON.parse(JSON.stringify(opinions))
  } catch (error) {
    throw error
  }
}

export async function getUserFriends(userId: string) {
  try {
    await connectMongoDB()
    const user = await UserModel.findById({ _id: userId }).populate("friends")

    const friends = user?.friends.map((frnd: any) => {
      return {
        _id: frnd._id.toString(),
        image: frnd.image,
        name: frnd.name,
        email: frnd.email,
        role: frnd.role,
      }
    })

    return friends
  } catch (error) {
    throw error
  }
}

export async function getInitialOpinions() {
  await connectMongoDB()

  try {
    // Try populating the creator and comments fields
    const opinions = await OpinionModel.find()
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "creator", model: "User" },
      })

    return JSON.parse(JSON.stringify(opinions))
  } catch (error) {
    console.error("Failed to populate:", error)
  }
}

export async function getUserFriendRequests(userId: string) {
  await connectMongoDB()
  try {
    const user = await UserModel.findById({ _id: userId })
    if (!user)
      throw new Error("User not found while getting his friend requests")
    return user.friendRequests
  } catch (error) {
    throw error
  }
}
