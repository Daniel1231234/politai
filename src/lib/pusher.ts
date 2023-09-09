import PusherServer from "pusher"
import PusherClient from "pusher-js"

const pusherAppId = process.env.PUSHER_APP_ID!
const pusherAppKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY!
const pusherSecret = process.env.PUSHER_SECRET!

export const pusherServer = new PusherServer({
  appId: pusherAppId,
  key: pusherAppKey,
  secret: pusherSecret,
  cluster: "eu",
  useTLS: true,
})

export const pusherClient = new PusherClient(pusherAppKey, {
  cluster: "eu",
})
