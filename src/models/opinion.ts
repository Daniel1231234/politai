import { Model, models, model, Document, Schema } from "mongoose"
import mongoose from "mongoose"
import { User } from "next-auth"
import CommentModel, { CommentDocument } from "./comment"
import { UserDocument } from "./user"
import { LikeDocument } from "./like"

export interface OpinionDocument extends Document {
  title: string
  body: string
  images: string[]
  topics: string[]
  creator: UserDocument
  comments: CommentDocument[]
  likes: LikeDocument[]
  dislikes?: any[]
  createdAt: number
}

const OpinionSchema: Schema<OpinionDocument> = new Schema<OpinionDocument>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  images: [],
  topics: [],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  dislikes: [],
  createdAt: { type: Number, default: Date.now() },
})

const OpinionModel = models.Opinion || model("Opinion", OpinionSchema)

export default OpinionModel as Model<OpinionDocument>

export interface createOpinionDto {
  title: string
  body: string
  images?: any[]
  topics: string[]
}
