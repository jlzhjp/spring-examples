import { Plus } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { useState } from "react"
import TodoItem from "./components/TodoItem"
import { useTodos } from "./lib/useTodos"

function AddTodoBox() {
  const { data, post } = useTodos()
  const [newTodoTitle, setNewTodoTitle] = useState("")

  const handleAddButtonClick = () => {
    post({
      title: newTodoTitle,
      completed: false,
    })
    setNewTodoTitle("")
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
        onClick={handleAddButtonClick}
        disabled={!data}
      >
        <Plus />
      </Button>
    </div>
  )
}

function TodoList() {
  const { data: todos, isLoading, error } = useTodos()

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
