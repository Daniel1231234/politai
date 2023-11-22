"use client"

import { CldImage } from "next-cloudinary"
import { Fragment, useState } from "react"
import { Transition, Dialog } from "@headlessui/react"

interface ImgContainerProps {
  publicId: any
}

const ImgContainer: React.FC<ImgContainerProps> = ({ publicId }) => {
  const [isOpenImage, setIsOpenImage] = useState(false)
  return (
    <>
      <CldImage
        onClick={() => setIsOpenImage(true)}
        src={publicId}
        alt={`photo-${publicId}`}
        width="300"
        height="300"
        fillBackground
      />
      <Transition
        as={Fragment}
        show={isOpenImage}
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
          open={isOpenImage}
          onClose={() => {}}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay
              className="fixed inset-0 bg-black opacity-60"
              onClick={() => setIsOpenImage(false)}
            />
            <CldImage
              src={publicId}
              alt={`photo-${publicId}`}
              width="400"
              height="400"
              fillBackground
              className="transition-transform transform hover:scale-105"
            />
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ImgContainer
