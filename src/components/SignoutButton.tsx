"use client"

import React from "react"
import { signOut } from "next-auth/react"

interface SignoutButtonProps {}

const SignoutButton: React.FC<SignoutButtonProps> = ({}) => {
  const handleSignout = async () => {
    try {
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("There was a problem signing out")
    }
  }

  return <button onClick={handleSignout}>Sign out</button>
}

export default SignoutButton
