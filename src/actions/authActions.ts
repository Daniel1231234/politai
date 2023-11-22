"use server"

import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import connectDB from "@/lib/mongodb"
import UserModel from "@/models/user"
import {
  GetUserByEmailParams,
  SignInWithCredentialsParams,
  SignInWithOauthParams,
  SignUpWithCredentialsParams,
  UpdateUserProfileParams,
} from "@/types"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function signInWithOauth({
  account,
  profile,
}: SignInWithOauthParams) {
  // console.log({account, profile})
  connectDB()

  const user = await UserModel.findOne({ email: profile.email })

  if (user) return true

  const newUser = await UserModel.create({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    role: profile.role,
    provider: account.provider,
  })

  console.log(newUser)

  return true
}

export async function getUserByEmail({ email }: GetUserByEmailParams) {
  connectDB()

  const user = await UserModel.findOne({ email }).select("-password")

  if (!user) {
    throw new Error("User does not exist!")
  }

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    provider: user.provider,
    image: user.image,
  }
}

export async function updateUserProfile({ name }: UpdateUserProfileParams) {
  const session = await getServerSession(authOptions)
  // console.log(session)

  connectDB()

  try {
    if (!session) {
      throw new Error("Unauthorization!")
    }

    const user = await UserModel.findByIdAndUpdate(
      session?.user?._id,
      {
        name,
      },
      { new: true }
    ).select("-password")

    if (!user) {
      throw new Error("User does not exist!")
    }

    return { success: true }
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`)
  }
}

export async function signUpWithCredentials({
  name,
  email,
  password,
}: SignUpWithCredentialsParams) {
  connectDB()

  try {
    const user = await UserModel.findOne({ email })

    if (user) {
      throw new Error("User already exists.")
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
      image: "/images/placeholder.jpg",
    })

    // console.log("newUser from signUpWithCredentials => ", newUser)
    // await newUser.save()

    return { success: true }
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`)
  }
}

export async function signInWithCredentials({
  email,
  password,
}: SignInWithCredentialsParams) {
  connectDB()

  const user = await UserModel.findOne({ email })

  if (!user) {
    throw new Error("Invalid email or password!")
  }

  const passwordIsValid = await user.comparePassword(password)

  if (!passwordIsValid) {
    throw new Error("Invalid email or password!")
  }
  // console.log("user from signInWithCredentials  => ", user)

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    provider: user.provider,
  }
}
