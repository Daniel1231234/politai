export type FriendRequest = {
  senderId: string
  senderImage: string
  senderName: string
}

export type UploadImagesResult = {
  info: {
    public_id: string
  }
  event: "success"
}

export type Like = {
  id: string
  creator: any
}

export enum PoliticalType {
  LEFT = "left",
  RIGHT = "right",
  LIBERTARIAN = "libertarian",
  CENTRIST = "centrist",
  CONSERVATIVE = "conservative",
  PROGRESSIVE = "progressive",
  SOCIALIST = "socialist",
  GREEN = "green",
  NATIONALIST = "nationalist",
  FASCIST = "fascist",
  ANARCHIST = "anarvhist",
  SOCIALDEMOCRAT = "socialDemocrat",
  COMMUNIST = "communist",
  MODERATE = "moderate",
}

declare module "next-auth" {
  interface User {
    name: string
    email: string
    image: string
    role: "admin" | "user"
    _id: any
  }

  interface Session {
    user: User & {
      _id: any
    }
  }
}
