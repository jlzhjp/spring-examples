import useSWR, { SWRConfiguration, useSWRConfig } from "swr"
import { ApiError, Todo } from "./types"

export default function useTodo(
  id: number,
  options?: SWRConfiguration<Todo, ApiError>
) {
  const { fetcher, mutate } = useSWRConfig()
  const { data, ...rest } = useSWR<Todo>(`/todos/${id}`, options)

  const patch = async (todoProps: Partial<Todo>) => {
    const doPatch = async () => {
      return (await fetcher!(`/todos/${data!.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoProps),
      })) as Todo
    }

    return await mutate(`/todos/${data!.id}`, doPatch(), {
      optimisticData: {
        ...data,
        ...todoProps,
      },
    })
  }

  const del = async () => {
    await fetcher!(`/todos/${data!.id}`, {
      method: "DELETE",
    })
    mutate("/todos")
  }

  return {
    data,
    ...rest,
    patch,
    del,
  }
}
