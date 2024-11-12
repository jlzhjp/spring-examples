import { XCircleIcon, CheckCircle, Circle } from "lucide-react"
import { Button } from "./ui/button"
import { type Todo } from "@/lib/types"
import { useState } from "react"
import { Input } from "./ui/input"
import useTodo from "@/lib/useTodo"

type TodoProps = {
  todo: Todo
}

export default function TodoItem({ todo }: TodoProps) {
  const { data, patch, del } = useTodo(todo.id, {
    fallbackData: todo,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [titleEditingValue, setTitleEditingValue] = useState("")

  const handleTitleClick = () => {
    setTitleEditingValue(data!.title)
    setIsEditing(true)
  }

  const handleTitleUpdate = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") return

    await patch({
      title: (event.target as HTMLInputElement).value,
    })

    setIsEditing(false)
  }

  const handleTodoStatusSwitch = async () => {
    await patch({
      completed: !data!.completed,
    })
  }

  const handleDelete = async () => {
    await del()
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
