export type ApiError = {
  timestamp: number
  error: string
  message: string
}

export type AuthenticationResponse = {
  token: string
}

export type AuthenticationRequest = {
  email: string
  password: string
}

export type Role = "ADMIN" | "USER"

export type RegisterRequest = {
  firstname: string
  lastname: string
  email: string
  password: string
  role: Role
}

export type UserInfoResponse = {
  firstname: string
  lastname: string
  email: string
  role: string
  authorities: string[]
}
