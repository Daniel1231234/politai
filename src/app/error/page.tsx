import Image from "next/image"

interface ErrorPageProps {
  statusCode: number
}

const ErrorPage = ({ statusCode }: ErrorPageProps) => {
  return (
    <div className="bg-gray-100 h-screen p-10">
      <header className="text-center">
        <Image
          src="/images/hero.png"
          alt="Logo"
          width={120}
          height={120}
          className="mx-auto rounded-md"
        />
      </header>

      <main className="text-center mt-10">
        <h1 className="text-6xl font-bold">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </h1>

        <div className="error-animation mt-10 flex items-center justify-center">
          <div className="w-40 h-40 bg-red-500 rounded-full animate-bounce" />
        </div>

        <p className="text-xl mt-5">
          Sorry about that! Please try refreshing the page or going back to the
          homepage.
        </p>
      </main>

      <footer className="text-center text-gray-500 text-sm mt-10">
        <p>&copy; My Website {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default ErrorPage
