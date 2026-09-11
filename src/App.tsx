import { useState } from "react";
import type { Todo } from "./types";
import { TodoItem } from "./TodoItem";

const initialTodos: Todo[] = [
  { id: "1", title: "Reactの基礎を学ぶ", done: false },
  { id: "2", title: "useStateを理解する", done: true },
  { id: "3", title: "propsとkeyを理解する", done: false },
];

function App() {
  const [todos] = useState<Todo[]>(initialTodos);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default App;
