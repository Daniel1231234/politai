"use client"

import React from "react"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  )
}

export default AuthProvider
