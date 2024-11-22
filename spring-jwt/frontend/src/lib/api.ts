import {
  ApiError,
  AuthenticationRequest,
  AuthenticationResponse,
  RegisterRequest,
  UserInfoResponse,
} from "./types"

export const getUser = async (token: string) => {
  const res = await fetch("http://localhost:8080/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const user: UserInfoResponse = await res.json()
  return user
}

export const getNotice = async (token: string) => {
  const res = await fetch("http://localhost:8080/notice", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const notice = await res.text()
  return notice
}

export const login = async (request: AuthenticationRequest) => {
  const res = await fetch("http://localhost:8080/auth/authenticate", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = (await res.json()) as ApiError
    throw error
  }

  const data = (await res.json()) as AuthenticationResponse
  return data
}

export const signup = async (request: RegisterRequest) => {
  const res = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = (await res.json()) as ApiError
    throw error
  }

  const data = (await res.json()) as AuthenticationResponse
  return data
}
