"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { signIn } from "next-auth/react"
import Input from "../../../components/Input"
import GoogleSignin from "@/components/GoogleSignin"

type Variant = "LOGIN" | "REGISTER"

interface Err {
  error: string
  [key: string]: any
}

const AuthPage = ({}) => {
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>("LOGIN")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "poli@poli.com",
      password: "123",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    try {
      const commonSignIn = async (): Promise<Err> => {
        return (await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        })) as Err
      }

      const goToFeed = (res: Err) => {
        if (res?.error) return new Error(res.error)
        else {
          router.replace("/feed")
          toast.success("Welcome to politai")
        }
      }

      if (variant === "REGISTER") {
        await fetch("/api/auth/users", {
          method: "POST",
          body: JSON.stringify(data),
        }).then((res) => res.json())

        const res = await commonSignIn()
        goToFeed(res)
      }

      if (variant === "LOGIN") {
        const res = await commonSignIn()
        if (res?.error) {
          toast.error(res.error)
          setVariant("REGISTER")
        }
        goToFeed(res)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error("Something went wrong!")
        console.error("Something went wrong:", err.message)
        console.error(err.stack)
      }
    } finally {
      reset()
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsGoogleLoading(true)
    try {
      await signIn("google")
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Something went wrong with your login.")
      }
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <section className="flex min-h-screen overflow-hidden items-stretch bg-slate-900">
      <div className="lg:flex w-1/2 hidden bg-slate-800 bg-no-repeat bg-cover relative items-center bg-bg-auth">
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <h2 className="text-5xl font-bold text-center tracking-wide text-gray-50 hover:opacity-80 transition">
            Welcome to Politai!
          </h2>
        </div>
      </div>
      <div className="lg:w-1/2  w-full flex items-center justify-center text-center  z-0">
        <div className="bg-white px-12 py-8 shadow sm:rounded-lg ">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="name"
                label="Name"
              />
            )}
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="email"
              label="Email address"
              type="email"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="password"
              label="Password"
              type="password"
            />
            <div>
              <button className="uppercase text-white block w-full p-2 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex flex-col justify-center  text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
                <GoogleSignin
                  loginWithGoogle={loginWithGoogle}
                  isLoading={isGoogleLoading}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-2"></div>
          </div>
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "New to PoliTai?"
                : "Already have an account?"}
            </div>
            <button
              onClick={toggleVariant}
              className="underline cursor-pointer"
            >
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthPage
