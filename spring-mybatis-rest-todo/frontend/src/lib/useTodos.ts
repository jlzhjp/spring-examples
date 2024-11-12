import useSWR, { SWRConfiguration, useSWRConfig } from "swr"
import { ApiError, Todo } from "./types"

export function useTodos(options?: SWRConfiguration<Todo[], ApiError>) {
  const { mutate, fetcher } = useSWRConfig()
  const { data, ...rest } = useSWR<Todo[]>("/todos", options)

  const post = async (todo: Omit<Todo, "id">) => {
    const doPost = async () => {
      const newTodo = (await fetcher!("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo.title,
          completed: false,
        }),
      })) as Todo
      return [...data!, newTodo]
    }

    mutate("/todos", doPost())
  }

  return { data, ...rest, post }
}
