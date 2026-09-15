import { useState } from "react";
import type { Todo } from "./types";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";
import { addTodo, removeTodo, toggleTodo } from "./todoOperations";

const initialTodos: Todo[] = [
  { id: "1", title: "Reactの基礎を学ぶ", done: false },
  { id: "2", title: "useStateを理解する", done: true },
  { id: "3", title: "propsとkeyを理解する", done: false },
];

function App() {
  const [todos, setTodos] = useState<readonly Todo[]>(initialTodos);

  const handleToggle = (id: string) => {
    setTodos(toggleTodo(todos, id));
  };

  const handleRemove = (id: string) => {
    setTodos(removeTodo(todos, id));
  };

  const handleAdd = (title: string) => {
    setTodos(addTodo(todos, title));
  };

  return (
    <>
      <AddTodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
    </>
  );
}

export default App;
