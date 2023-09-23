import { Model, models, model, Document, Schema } from "mongoose"
import mongoose from "mongoose"
import { Like } from "@/types"
import { UserDocument } from "./user"
import { OpinionDocument } from "./opinion"

export interface CommentDocument extends Document {
  text: string
  creator: UserDocument
  opinion: OpinionDocument
  likes: Like[]
  dislikes?: any[]
  createdAt: Date
}

const CommentSchema: Schema<CommentDocument> = new Schema<CommentDocument>({
  text: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  opinion: { type: mongoose.Schema.Types.ObjectId, ref: "Opinion" },
  likes: [],
  dislikes: [],
  createdAt: { type: Date, default: new Date() },
})

const CommentModel = models.Comment || model("Comment", CommentSchema)

export default CommentModel as Model<CommentDocument>
