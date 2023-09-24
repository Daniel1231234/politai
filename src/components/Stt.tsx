"use client"

import React, { useEffect, useState } from "react"
import { MdMic, MdMicOff } from "react-icons/md"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"

interface SttProps {}

const Stt: React.FC<SttProps> = ({}) => {
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
      console.log("Got final result:", finalTranscript)
    }
  }, [interimTranscript, finalTranscript])

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

  return (
    <div className=" h-full py-4  w-full flex flex-col justify-between">
      <h1 className="text-3xl font-semibold mb-6">Speech to Text</h1>
      <div className="bg-white rounded-md h-full my-4">
        <span className="text-lg font-medium">Generated Text:</span>
        <p className="mt-2 text-gray-700">{transcript}</p>
      </div>
      <p className="mb-4 text-xl font-semibold">
        Microphone:{" "}
        <span className="text-blue-500">
          {listening ? "Listening..." : "Off"}
        </span>
      </p>
      <div className="flex gap-4 flex-wrap">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
          onClick={handleStartListening}
        >
          <MdMic size={20} className="mr-2" />
          Start
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center"
          onClick={handleStopListening}
        >
          <MdMicOff size={20} className="mr-2" />
          Stop
        </button>
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded-md"
          onClick={resetTranscript}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Stt
