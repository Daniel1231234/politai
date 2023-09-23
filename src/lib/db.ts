import mongoose from "mongoose"
import "../models"

const url = process.env.MONGODB_URI as string
if (!url) throw new Error("MONGODB_URI is not defined.")

declare var global: any

let cached: any = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null }
}

export const connectMongoDB = async () => {
  if (cached.conn) return cached.conn

  cached.conn = await mongoose.connect(url)

  return cached.conn
}
