"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (session.status === "authenticated") return push("/")
  }, [push, session.status])

  return <div>{children}</div>
}
export default AuthLayout
