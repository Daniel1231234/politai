import { Model, models, model, Document, Schema } from "mongoose"
import * as bcrypt from "bcrypt"
import mongoose from "mongoose"
import OpinionDocument from "./opinion"
import { FriendRequest } from "@/types"

interface UserDocument extends Document {
  email: string
  password: string
  name: string
  active: boolean
  phone: string
  location: any
  image: string
  birthday: string
  gender: string
  opinions: (typeof OpinionDocument)[]
  ideology: string
  religion: string
  friends: any
  friendRequests: FriendRequest[]
  createdAt: Date
  role: "admin" | "user"
}

interface Methodods {
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<UserDocument, {}, Methodods>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
  phone: { type: String, default: "" },
  image: { type: String, default: "" },
  birthday: { type: String, default: "" },
  friendRequests: [],
  gender: { type: String, default: "" },
  opinions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opinion",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  ideology: { type: String, default: "" },
  role: { type: String, enum: ["admin", "user"], default: "user" },
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    throw error
  }
})

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const UserModel = models.User || model("User", userSchema)

export default UserModel as Model<UserDocument, {}, Methodods>
