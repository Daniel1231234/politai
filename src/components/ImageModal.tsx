"use client"

import { Transition, Dialog } from "@headlessui/react"
import { ReactNode, Fragment } from "react"
import Image from "next/image"

interface ImageModalProps {
  isShowing: boolean
  setIsShowing: any
  src?: string
}

const ImageModal: React.FC<ImageModalProps> = ({
  isShowing,
  setIsShowing,
  src = "/images/placeholder.png",
}) => {
  return (
    <Transition
      as={Fragment}
      show={isShowing}
      enter="transform transition duration-[400ms]"
      enterFrom="opacity-0 rotate-[-120deg] scale-50"
      enterTo="opacity-100 rotate-0 scale-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 rotate-0 scale-100 "
      leaveTo="opacity-0 scale-95 "
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isShowing}
        onClose={() => {}}
      >
        <div className="flex items-center justify-center h-full">
          <Dialog.Overlay
            className="fixed inset-0 bg-black opacity-60"
            onClick={() => setIsShowing(false)}
          />
          <Image
            src={src}
            alt=""
            width={300}
            height={300}
            className="rounded-full transition-transform transform hover:scale-105"
          />
        </div>
      </Dialog>
    </Transition>
  )
}

export default ImageModal
