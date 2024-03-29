"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { signIn } from "next-auth/react"
import Input from "../components/Input"
import GoogleSignin from "@/components/GoogleSignin"
import MobileAuthForm from "@/components/MobileAuthForm"
import { signUpWithCredentials } from "@/actions/authActions"

type Variant = "LOGIN" | "REGISTER"

interface AuthFormProps {
  callbackUrl: string
}

const AuthForm: React.FC<AuthFormProps> = ({ callbackUrl }) => {
  const [variant, setVariant] = useState<Variant>("LOGIN")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [isShowForm, setIsShowForm] = useState<boolean>(false)

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
      name: "foo",
      email: "foo@bar.com",
      password: "123",
    },
  })

  const onSubmit: SubmitHandler<FieldValues | any> = async (data) => {
    setIsLoading(true)
    try {
      if (variant === "REGISTER") {
        const res: any = await signUpWithCredentials(data)
        if (res.success) {
          setVariant("LOGIN")
        }
      } else if (variant === "LOGIN") {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl,
        })
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
      reset()
    }
  }

  const loginWithGoogle = async () => {
    setIsGoogleLoading(true)
    try {
      await signIn("google", { callbackUrl })
    } catch (error) {
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <section className="auth-page-client flex min-h-screen overflow-hidden items-stretch bg-slate-900">
      <div className="flex w-full lg:w-1/2 bg-slate-800 bg-no-repeat bg-cover relative items-center bg-[url(/images/hero.png)]">
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-4 lg:px-20 text-center lg:text-left z-10 flex flex-col items-center justify-center gap-y-7 h-full">
          <p className="text-4xl md:leading-snug font-semibold text-white">
            Connect with Politai-Social and Engage in Politics Like Never
            Before!
          </p>

          <p className="text-xl leading-relaxed text-white">
            Join our community and stay informed about political discussions,
            debates, and news.{" "}
            <span className="font-bold">Make your voice heard!</span>
          </p>

          <button
            onClick={() => setIsShowForm(true)}
            className="lg:hidden text-white px-6 py-2 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
          >
            Explore politai now!
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 w-full lg:flex hidden items-center justify-center text-center  z-0">
        <div className={`bg-white px-12 py-8 shadow rounded-lg`}>
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
              <button className="text-white block w-full p-2 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
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
      {isShowForm && (
        <MobileAuthForm
          isShowForm={isShowForm}
          setIsShowForm={setIsShowForm}
          variant={variant}
          isLoading={isLoading}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          toggleVariant={toggleVariant}
          isGoogleLoading={isGoogleLoading}
          loginWithGoogle={loginWithGoogle}
        />
      )}
    </section>
  )
}

export default AuthForm
