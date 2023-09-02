import React from "react"

interface AboutProps {
  user: any
}

const About: React.FC<AboutProps> = ({ user }) => {
  return (
    <div className="w-full p-6 mx-auto">
      <h2 className="text-2xl text-gray-900">Account Setting</h2>
      <form className="mt-6 border-t border-gray-400 pt-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="md:w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-text-1"
            >
              email address
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
              id="grid-text-1"
              type="text"
              placeholder="Enter email"
            />
          </div>
          <div className="w-full md:w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              FullName
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
              type="text"
              placeholder="Enter full name"
            />
          </div>
          <div className="w-full md:w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              pick your country
            </label>
            {/* <CountrySelect /> */}
          </div>
          <div className="personal w-full border-t border-gray-400 pt-4">
            <h2 className="text-2xl text-gray-900 mb-4">Political profile:</h2>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Choose politcal types
              </label>
              {/* <PoliticalTypeSelect /> */}
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Ideology
              </label>
              <textarea
                className="bg-gray-100 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner  border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3"
                type="submit"
              >
                save changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default About
