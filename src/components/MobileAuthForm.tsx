import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Input from "../components/Input"
import GoogleSignin from "@/components/GoogleSignin"
import { FieldValues, SubmitHandler, UseFormRegister } from "react-hook-form"

type Variant = "LOGIN" | "REGISTER"

interface MobileAuthFormProps {
  isShowForm: boolean
  setIsShowForm: (isShowForm: boolean) => void
  variant: Variant
  toggleVariant: () => void
  isLoading: boolean
  isGoogleLoading: boolean
  register: UseFormRegister<FieldValues>
  handleSubmit: (onSubmit: SubmitHandler<FieldValues>) => any
  onSubmit: SubmitHandler<FieldValues>
  loginWithGoogle: () => Promise<void>
  errors: any // Replace 'any' with the correct error type from react-hook-form
}

const MobileAuthForm: React.FC<MobileAuthFormProps> = ({
  isShowForm,
  setIsShowForm,
  variant,
  toggleVariant,
  isLoading,
  isGoogleLoading,
  register,
  handleSubmit,
  onSubmit,
  loginWithGoogle,
  errors,
}) => {
  return (
    <Transition appear show={isShowForm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed lg:hidden inset-0 z-10 overflow-y-auto"
        onClose={() => setIsShowForm(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                  <span className="bg-white px-2 text-gray-500 text-center">
                    Or
                  </span>
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
      </Dialog>
    </Transition>
  )
}

export default MobileAuthForm
