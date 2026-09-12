import type { Todo } from "./types";

interface TodoItemProps {
  todo: Readonly<Todo>;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.title}</span>
      <button type="button" onClick={() => onRemove(todo.id)}>
        削除
      </button>
    </li>
  );
}
