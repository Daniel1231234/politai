"use client"

import React, { useEffect, useState } from "react"
import { MdMic, MdMicOff } from "react-icons/md"
import { MdContentCopy } from "react-icons/md"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import "regenerator-runtime/runtime"
import dynamic from "next/dynamic"
import useClipboard from "react-use-clipboard"
import toast from "react-hot-toast"

interface SttProps {}

const Stt: React.FC<SttProps> = ({}) => {
  const [message, setMessage] = useState<string>("")
  const [isCopied, setCopied] = useClipboard(message)

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  useEffect(() => {
    if (finalTranscript !== "") {
      setMessage(finalTranscript)
      SpeechRecognition.stopListening()
      console.log("Got final result:", finalTranscript)
    }

    if (finalTranscript.endsWith("חלאס")) {
      resetTranscript()
    }
  }, [interimTranscript, finalTranscript, resetTranscript])

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "he" })
  }

  const handleStopListening = () => SpeechRecognition.stopListening()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>
  }

  return (
    <div className="flex flex-col overflow-y-auto">
      <h1 className="text-3xl font-semibold mb-4 sm:text-4xl mt-4">
        Speech to Text
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mx-2">
        <p className="text-lg font-medium mb-2">Generated Text:</p>

        <div className="h-60 overflow-y-auto px-2 py-4 rounded-md">
          <p className="text-gray-700 text-sm md:text-base">{transcript}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <p className="text-lg">
          <span className="mx-2">Microphone: </span>
          <span className="text-blue-500">
            {listening ? "Listening..." : "Off"}
          </span>
        </p>

        <div className="sm:flex-row flex flex-col gap-4 mt-4 sm:mt-0 mx-2">
          <button
            className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-800"
            onClick={handleStartListening}
          >
            <MdMic className="mr-2" />
            <span className="text-base sm:text-lg">Start</span>
          </button>

          <button
            className="flex items-center px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 active:bg-red-800"
            onClick={handleStopListening}
          >
            <MdMicOff className="mr-2" />
            <span className="text-base sm:text-lg">Stop</span>
          </button>

          <button
            className="flex items-center px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 active:bg-green-800"
            onClick={() => {
              setCopied()
              if (isCopied) {
                toast.success("Text copied successfully!")
              }
            }}
          >
            <MdContentCopy className="mr-2" />
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Stt), { ssr: false })
