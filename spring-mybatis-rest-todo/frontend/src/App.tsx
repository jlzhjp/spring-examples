import { Plus } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import TodoItem from "./components/TodoItem"
import { type Todo } from "./lib/types"

function AddTodoBox() {
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const { mutate, fetcher } = useSWRConfig()
  const { data: todos } = useSWR<Todo[]>("/todos")

  const addTodo = async () => {
    const response = (await fetcher!("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTodoTitle,
        completed: false,
      }),
    })) as Todo
    console.log(response)

    setNewTodoTitle("")
    mutate("/todos", [...todos!, response])
  }

  return (
    <div className="flex p-10">
      <Input
        className="m-4 mr-0"
        value={newTodoTitle}
        onChange={(event) => {
          setNewTodoTitle(event.target.value)
        }}
      />
      <Button
        className="m-4 ml-1"
        size="icon"
        onClick={addTodo}
        disabled={!todos}
      >
        <Plus />
      </Button>
    </div>
  )
}

function TodoList() {
  const { data: todos, isLoading, error } = useSWR<Todo[]>("/todos")

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <div>
        Error loading todos : <br />
        {JSON.stringify(error)}
      </div>
    )
  }

  return (
    <>
      {todos!.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
  )
}

function App() {
  return (
    <>
      <AddTodoBox />
      <TodoList />
    </>
  )
}

export default App
