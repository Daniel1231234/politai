import React from "react"

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h1 className="text-3xl font-bold text-red-600">Oops!</h1>
        <p className="mt-4 text-gray-700">
          It seems like we have a little political turbulence right now.
        </p>
        <p className="mt-2 text-gray-500">
          The page you're looking for either moved to a new constituency or got
          impeached. Let's get you back to the debating chamber.
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          Go Home
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
