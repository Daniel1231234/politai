import React from "react"
import { UserDocument } from "@/models/user"

interface AboutProps {
  user: UserDocument
}

const About: React.FC<AboutProps> = ({ user }) => {
  return (
    <div className="w-full p-6 mx-auto">
      <h2 className="text-2xl text-gray-900">{user.name}</h2>
    </div>
  )
}

export default About
