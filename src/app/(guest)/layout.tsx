import { getServerSession } from "next-auth"
import { authOptios } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

interface LayoutProps {
  children: React.ReactNode
}

const GuestLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptios)
  if (session) redirect("/feed")

  return (
    <>
      <section className="bg-light-1">{children}</section>
    </>
  )
}

export default GuestLayout
