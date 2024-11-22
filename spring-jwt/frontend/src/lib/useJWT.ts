import { use } from "react"
import { AuthorizationContext } from "./AuthorizationProvider"

export default function useJWT() {
  return use(AuthorizationContext).auth?.token
}
