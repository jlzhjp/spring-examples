import { XCircleIcon, CheckCircle, Circle } from "lucide-react"
import { Button } from "./ui/button"
import { type Todo } from "@/lib/types"
import useSWR, { useSWRConfig } from "swr"
import { useState } from "react"
import { Input } from "./ui/input"

type TodoProps = {
  todo: Todo
}

export default function TodoItem({ todo }: TodoProps) {
  const { fetcher, mutate } = useSWRConfig()
  const { data } = useSWR<Todo>(`/todos/${todo.id}`, {
    fallbackData: todo,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [titleEditingValue, setTitleEditingValue] = useState("")

  async function patchTodo(todoProps: Partial<Todo>) {
    const patch = async () => {
      return (await fetcher!(`/todos/${data!.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoProps),
      })) as Todo
    }

    return await mutate(`/todos/${data!.id}`, patch(), {
      optimisticData: {
        ...data,
        ...todoProps,
      },
    })
  }

  const handleTitleClick = () => {
    setTitleEditingValue(data!.title)
    setIsEditing(true)
  }

  const handleTitleUpdate = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") return

    const updatedTodo = await patchTodo({
      title: (event.target as HTMLInputElement).value,
    })
    setIsEditing(false)
    return updatedTodo
  }

  const handleTodoStatusSwitch = async () => {
    const updatedTodo = await patchTodo({
      completed: !data!.completed,
    })
    return updatedTodo
  }

  const handleDelete = async () => {
    await fetcher!(`/todos/${data!.id}`, {
      method: "DELETE",
    })
    mutate("/todos")
  }

  return (
    <div className="shadow p-4 m-2 rounded flex flex-row items-center cursor-pointer hover:shadow-lg transition-shadow">
      <div className="mr-4">
        {data!.completed ? (
          <CheckCircle
            onClick={handleTodoStatusSwitch}
            className="fill-green-600"
          />
        ) : (
          <Circle onClick={handleTodoStatusSwitch} />
        )}
      </div>
      {isEditing ? (
        <Input
          value={titleEditingValue}
          onKeyDown={handleTitleUpdate}
          onChange={(e) => setTitleEditingValue(e.target.value)}
        />
      ) : (
        <h4
          className="text-bold text-xl font-bold select-none cursor-pointer"
          onClick={handleTitleClick}
        >
          {data?.title}
        </h4>
      )}
      <div className="grow"></div>
      <Button
        variant="outline"
        size="icon"
        onClick={(event) => {
          event.stopPropagation()
          handleDelete()
        }}
      >
        <XCircleIcon />
      </Button>
    </div>
  )
}
