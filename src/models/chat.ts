import { Message } from "@/types"
import { Model, models, model, Document, Schema } from "mongoose"
import { User } from "next-auth"

export interface ChatDocument extends Document {
  chatId: string
  messages: Message[]
  users: User[]
}

const ChatSchema = new Schema<ChatDocument>({
  chatId: { type: String, required: true },
  messages: [],
  users: [],
})

const ChatModel = models.Chat || model("Chat", ChatSchema)

export default ChatModel as Model<ChatDocument>
