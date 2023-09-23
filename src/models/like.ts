import { Model, models, model, Document, Schema } from "mongoose"
import mongoose from "mongoose"
import { UserDocument } from "./user"
import { OpinionDocument } from "./opinion"

export interface LikeDocument extends Document {
  creator: UserDocument
  opinion: OpinionDocument
  createdAt: number
}

const LikeSchema: Schema<LikeDocument> = new Schema<LikeDocument>({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  opinion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opinion",
    required: true,
  },
  createdAt: { type: Number, default: Date.now() },
})

const LikeModel = models.Like || model("Like", LikeSchema)

export default LikeModel as Model<LikeDocument>
