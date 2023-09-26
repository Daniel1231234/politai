"use client"

import { sendWhatsapp } from "@/actions"
import React, { useEffect, useState } from "react"
import { MdMic, MdMicOff } from "react-icons/md"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import "regenerator-runtime/runtime"
import dynamic from "next/dynamic"
import Divider from "./Divider"

interface SttProps {}

const Stt: React.FC<SttProps> = ({}) => {
  const [phoneNumber, setPhoneNumber] = useState<any>()
  const [message, setMessage] = useState<string>("")

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

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "he" })
  }

  const handleStopListening = () => SpeechRecognition.stopListening()

  const handleSendWhatsapp = async () => {
    if (phoneNumber && message) {
      await sendWhatsapp(phoneNumber, transcript)
    } else {
      console.log("Phone number is empty")
    }
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

        <div className="flex mt-4 sm:mt-0 mx-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2 flex items-center"
            onClick={handleStartListening}
          >
            <MdMic className="mr-2" />
            <span className="text-base sm:text-lg">Start</span>
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center"
            onClick={handleStopListening}
          >
            <MdMicOff className="mr-2" />
            <span className="text-base sm:text-lg">Stop</span>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center my-4">
        <div className="flex flex-col sm:flex-row sm:gap-4 flex-wrap mt-4 sm:mt-0 w-full">
          <PhoneInput
            defaultCountry="IL"
            className="mx-2"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />

          <button
            className="bg-green-600 my-2 mx-2 px-4 py-2 rounded-md text-white "
            onClick={handleSendWhatsapp}
          >
            Send Whatsapp
          </button>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Stt), { ssr: false })
