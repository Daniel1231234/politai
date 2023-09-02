"use client"

import React from "react"
import { BsGoogle } from "react-icons/bs"
import Button from "./Button"

interface GoogleSigninProps {
  loginWithGoogle: () => Promise<void>
  isLoading: boolean
}

const GoogleSignin: React.FC<GoogleSigninProps> = ({
  loginWithGoogle,
  isLoading,
}) => {
  return (
    <Button
      isLoading={isLoading}
      onClick={loginWithGoogle}
      className="inline-flex gap-4 w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      <span>Sign in with Google</span>
      <BsGoogle />
    </Button>
  )
}

export default GoogleSignin
