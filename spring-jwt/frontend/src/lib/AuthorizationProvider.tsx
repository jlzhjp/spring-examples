import { useState, type ReactNode } from "react"
import { createContext } from "react"

type AuthorizationInfo = {
  token: string
}

type AuthorizationContextType = {
  auth: AuthorizationInfo | undefined
  setAuth: (info: AuthorizationInfo | undefined) => void
}

const AuthorizationContext = createContext<AuthorizationContextType>({
  setAuth: () => {},
  auth: undefined,
})

const AuthorizationProvider = ({ children }: { children?: ReactNode }) => {
  const [authorizationInfo, setAuthorizationInfo] = useState<
    AuthorizationInfo | undefined
  >(undefined)

  return (
    <AuthorizationContext
      value={{ auth: authorizationInfo, setAuth: setAuthorizationInfo }}
    >
      {children}
    </AuthorizationContext>
  )
}

export default AuthorizationProvider
export { AuthorizationContext }
