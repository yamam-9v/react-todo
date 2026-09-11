import type { Todo } from "./types";

interface TodoItemProps {
  todo: Readonly<Todo>;
}

export function TodoItem({ todo }: TodoItemProps) {
  return (
    <li>
      <input type="checkbox" checked={todo.done} readOnly />
      <span>{todo.title}</span>
    </li>
  );
}
