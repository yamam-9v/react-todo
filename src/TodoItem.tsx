import type { Todo } from "./types";
import type { Holiday } from "./holidays";

interface TodoItemProps {
  todo: Readonly<Todo>;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  holiday?: Holiday;
}

export function TodoItem({ todo, onToggle, onRemove, holiday }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.title}</span>
      {todo.dueDate !== null && (
        <span>
          (期限: {todo.dueDate}
          {holiday !== undefined && ` ${holiday.localName}`})
        </span>
      )}
      <button type="button" onClick={() => onRemove(todo.id)}>
        削除
      </button>
    </li>
  );
}
