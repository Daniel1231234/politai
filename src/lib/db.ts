import mongoose from "mongoose"

const url = process.env.MONGODB_URI as string
let connection: typeof mongoose

export const connectMongoDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected")
      return
    }
    if (!connection) connection = await mongoose.connect(url)
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB")
    })
    return connection
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error)
  }
}
