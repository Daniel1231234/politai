import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

interface LayoutProps {
  children: React.ReactNode
}

const AdminLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions)

  const user = session?.user as { role: string } | undefined

  const isAdmin = user?.role === "admin"

  if (!isAdmin) redirect("/auth")

  return (
    <>
      <section className="bg-light-1">{children}</section>
    </>
  )
}

export default AdminLayout
