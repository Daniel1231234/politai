import AuthForm from "@/components/AuthForm"

interface AuthPage {
  searchParams: {
    callbackUrl: string
  }
}

export default function AuthPage({ searchParams: { callbackUrl } }: AuthPage) {
  return <AuthForm callbackUrl={callbackUrl || "/"} />
}
