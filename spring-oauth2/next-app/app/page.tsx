"use client"

import { signIn, useSession, signOut } from "@/lib/authClient"

export default function Home() {
  const { data, error } = useSession()

  if (error) {
    return <div>{error.message}</div>
  }

  const handleLoginButtonClick = () => {
    signIn.oauth2({
      providerId: "test-provider",
      callbackURL: "/",
    })
  }

  if (!data) {
    return (
      <button
        className="p-2 rounded border-gray-400 border-2"
        onClick={handleLoginButtonClick}
      >
        Login
      </button>
    )
  }

  return (
    <div>
      <h1>Welcome {data.user.email}</h1>
      <button
        className="p-2 rounded border-gray-400 border-2"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  )
}
