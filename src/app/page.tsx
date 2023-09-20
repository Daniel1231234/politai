import AppLogo from "@/components/AppLogo"
import Link from "next/link"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

const Home = async () => {
  const session = await getServerSession(authOptions)
  if (session) redirect("/feed")

  return (
    <main className="leading-normal tracking-normal text-gray-900 bg-gradient-to-r from-[#d53369] to-[#daae51] min-h-full">
      <header className="w-full z-30 top-0 left-0 text-gray-900 flex items-center justify-between">
        <AppLogo />
        <ul className="flex justify-end items-center">
          <li className="mr-3">
            <Link
              href="/auth"
              className="h-10 py-2 px-4 bg-slate-900 text-white hover:bg-slate-800 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              {"Sign In"}
            </Link>
          </li>
        </ul>
      </header>
      <div className="pt-4 container">
        <div className="mx-auto flex flex-wrap items-center justify-center gap-4">
          <div className="w-full md:w-2/5 text-center md:text-left  ">
            <h1 className="my-4 text-3xl md:text-5xl md:leading-tight font-bold   ">
              Connect with Politai-Social and Engage in Politics Like Never
              Before!
            </h1>
            <p className="mt-4 text-2xl leading-normal">
              Join our community and stay informed about political discussions,
              debates, and news. Make your voice heard!
            </p>
            <Link
              href="/feed"
              className="h-10 my-4 px-4 bg-slate-900 text-white hover:bg-slate-800 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              Explore Politai now!
            </Link>
          </div>
          <div className="py-6 text-center relative">
            <Image
              width={350}
              height={350}
              sizes="60vw"
              priority
              className="rounded-full opacity-80 mx-auto"
              src="/images/hero.png"
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
