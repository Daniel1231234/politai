import { Model, models, model, Document, Schema } from "mongoose"

export interface CommentDocument extends Document {
  text: string
  creator: any
  opinion: any
  likes: any[]
  dislikes: any[]
  createdAt: Date
}

const CommentSchema = new Schema<CommentDocument>({
  text: { type: String, require: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  opinion: { type: Schema.Types.ObjectId, ref: "Opinion" },
  likes: [],
  dislikes: [],
  createdAt: { type: Date, default: new Date() },
})

const CommentModel = models.Comment || model("Comment", CommentSchema)

export default CommentModel as Model<CommentDocument>
