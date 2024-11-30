import { createAuthClient } from "better-auth/react"
import { genericOAuthClient } from "better-auth/client/plugins"

export const { signUp, signIn, signOut, useSession, getSession } =
  createAuthClient({
    plugins: [genericOAuthClient()],
  })
