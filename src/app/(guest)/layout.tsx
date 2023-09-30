import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

interface LayoutProps {
  children: React.ReactNode
}

const GuestLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions)
  if (session) redirect("/feed")

  return <div className="">{children}</div>
}

export default GuestLayout
