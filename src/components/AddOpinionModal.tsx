"use client"

import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import TextareaAutosize from "react-textarea-autosize"
import { toast } from "react-hot-toast"
import ReactSelect from "react-select"
import makeAnimated from "react-select/animated"
import { getInitialTopics } from "@/lib/utils"
import { createOpinionDto } from "@/models/opinion"
import Button from "./Button"
import { FaFileImage } from "react-icons/fa"

const animatedComponents = makeAnimated()

const initialTopics = getInitialTopics()

const emptyOpinion = {
  title: "",
  body: "",
  images: [],
  topics: [],
}

interface AddOpinionModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  user: any
}

const AddOpinionModal: React.FC<AddOpinionModalProps> = ({
  isOpen,
  setIsOpen,
  user,
}) => {
  const [topics, setTopics] = useState<string[]>(["general"])
  const [opinion, setOpinion] = useState<createOpinionDto>(emptyOpinion)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
  }

  const selectTopics = (topics: any) => {
    const topicValues = topics.map((item: any) => item.value)
    setTopics(topicValues)
  }

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const opinionToSend = { ...opinion, topics }
      const res = await fetch("/api/opinion", {
        method: "POST",
        body: JSON.stringify(opinionToSend),
      }).then((res) => res.json())
      if (res.success) toast.success("Opinion added Successfully!")
    } catch (error) {
      toast.error("Something went wrong, please try again later")
      throw error
    } finally {
      setIsLoading(false)
      setOpinion(emptyOpinion)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create new opinion
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Title for your opinion"
                    className="block w-full p-2 border rounded-md"
                    onChange={(e) =>
                      setOpinion((prev: createOpinionDto) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mt-2 relative border rounded-md focus-within:border-blue-400">
                  <TextareaAutosize
                    minRows={4}
                    value={opinion.body}
                    onChange={(e) =>
                      setOpinion((prev: createOpinionDto) => ({
                        ...prev,
                        body: e.target.value,
                      }))
                    }
                    placeholder={`Make your voice heard, ${user?.name}!`}
                    className="block w-full  border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6 min-h-[80px]"
                  />
                  <label
                    htmlFor="file-upload"
                    className="absolute bottom-4 right-4 cursor-pointer"
                  >
                    <FaFileImage size={24} />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={onFileChange}
                  />
                </div>

                <div className="mt-2 flex flex-col gap-4">
                  <span className="text-sm font-bold">Topics:</span>
                  <ReactSelect
                    onChange={selectTopics}
                    closeMenuOnSelect={false}
                    className="h-full block"
                    components={animatedComponents}
                    options={initialTopics}
                    isMulti
                  />
                </div>

                <div className="mt-4">
                  <Button
                    isLoading={isLoading}
                    className=" !bg-blue-100 w-full  text-blue-900 hover:!bg-blue-200 "
                    onClick={onSubmit}
                  >
                    Post
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AddOpinionModal
