import AuthProvider from "@/components/AuthProvider"
import "./globals.css"
import type { Metadata } from "next"
import Providers from "@/components/Providers"

export const metadata: Metadata = {
  title: "Politai",
  description: `Join our community and stay informed about political discussions, 
  debates, and news. Make your voice heard!`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </AuthProvider>
  )
}
