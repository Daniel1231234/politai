"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { connectMongoDB } from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import ChatModel from "@/models/chat"
import LikeModel from "@/models/like"
import OpinionModel from "@/models/opinion"
import UserModel from "@/models/user"
import { getServerSession } from "next-auth"

export async function getUsersById(userId: string, friendId: string) {
  await connectMongoDB()
  const res = await Promise.all([
    UserModel.findById({ _id: userId }, "_id name email image chats role"),
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
      .populate("creator", "_id name image email role")
      .populate({
        path: "comments",
        populate: { path: "creator", select: "_id name image email role" },
      })
      .populate("likes")

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

export async function addNewLike(opinionId: string) {
  try {
    await connectMongoDB()
    const session = await getServerSession(authOptions)
    if (!session) return { success: false }

    const opinion = await OpinionModel.findById(opinionId).populate({
      path: "likes",
      populate: { path: "creator", select: "_id name image email role" },
    })

    if (!opinion) return { success: false }

    const existingLike = opinion?.likes.find(
      (like) => like.creator.email === session.user.email
    )

    if (existingLike) {
      await Promise.all([
        pusherServer.trigger(
          toPusherKey(`opinion:${opinion._id}:likes`),
          "remove-like",
          { likeId: existingLike._id, opinionId: opinion._id }
        ),
        LikeModel.findOneAndDelete(existingLike._id),
        OpinionModel.findOneAndUpdate(
          { _id: opinion._id },
          { $pull: { likes: existingLike } }
        ),
      ])
      return { success: true, message: "Removing like" }
    } else {
      const newLike = await LikeModel.create({
        creator: session.user,
        opinion: opinionId,
      })

      await Promise.all([
        pusherServer.trigger(
          toPusherKey(`opinion:${opinion._id}:likes`),
          "add-like",
          { like: newLike, opinionId: opinion._id }
        ),
        OpinionModel.findOneAndUpdate(
          { _id: opinion?._id },
          { $push: { likes: newLike } }
        ),
      ])

      return { success: true, message: "Adding like" }
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getChatData(chatId: string, sessionId: string) {
  try {
    await connectMongoDB()
    let chat = await ChatModel.findOne({ chatId })
    if (!chat) return { success: false, message: "No chat has found" }
    const chatPartner = chat.users.find((user) => user._id !== sessionId)
    return JSON.parse(JSON.stringify({ chat, chatPartner }))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteChat(chatId: string) {
  try {
    await connectMongoDB()
    const chat = await ChatModel.findOne({ chatId })
    if (!chat) return { success: false, message: "No found chat" }

    const chatToDelete = ChatModel.findOneAndDelete({ chatId })

    const updatedUser = UserModel.findByIdAndUpdate(
      { _id: chat.users[0]._id },
      { $pull: { chats: chat._id } }
    )

    const updatedFriend = UserModel.findByIdAndUpdate(
      { _id: chat.users[1]._id },
      { $pull: { chats: chat._id } }
    )

    await Promise.all([chatToDelete, updatedUser, updatedFriend])
    return { success: true }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function removeChatMessage(chatId: string, messageId: string) {
  try {
    await connectMongoDB()
    let chat = await ChatModel.findOne({ chatId })
    if (!chat) return null
    const messages = chat.messages
    const updatedMessages = messages.filter((msg) => msg.id !== messageId)
    await Promise.all([
      pusherServer.trigger(chatId, "delete-message", messageId),
      ChatModel.findByIdAndUpdate(
        { _id: chat._id },
        { $set: { messages: updatedMessages } }
      ),
    ])

    return { sucess: true, message: "Message deleted successfuly" }
  } catch (error) {
    console.log(error)
    throw error
  }
}
