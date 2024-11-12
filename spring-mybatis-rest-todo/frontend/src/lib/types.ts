export type Todo = {
  id: number
  title: string
  completed: boolean
}

export type ApiError = {
  timestamp: string
  status: number
  error: string
  trace: string
  message: string
  path: string
}
