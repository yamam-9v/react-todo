import { useState } from "react";
import type { Todo } from "./types";
import { TodoItem } from "./TodoItem";
import { addTodo, removeTodo, toggleTodo } from "./todoOperations";

const initialTodos: Todo[] = [
  { id: "1", title: "Reactの基礎を学ぶ", done: false },
  { id: "2", title: "useStateを理解する", done: true },
  { id: "3", title: "propsとkeyを理解する", done: false },
];

function App() {
  const [todos, setTodos] = useState<readonly Todo[]>(initialTodos);
  const [newTitle, setNewTitle] = useState("");

  const handleToggle = (id: string) => {
    setTodos(toggleTodo(todos, id));
  };

  const handleRemove = (id: string) => {
    setTodos(removeTodo(todos, id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() === "") return;
    setTodos(addTodo(todos, newTitle));
    setNewTitle("");
  };

  return (
    <>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="新しいTodo"
        />
        <button type="submit">追加</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
