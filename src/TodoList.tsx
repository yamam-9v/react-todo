import type { Todo } from "./types";
import { TodoItem } from "./TodoItem";
import { findHoliday, type Holiday } from "./holidays";

interface TodoListProps {
  todos: readonly Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  holidays: readonly Holiday[];
}

export function TodoList({
  todos,
  onToggle,
  onRemove,
  holidays,
}: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
          holiday={
            todo.dueDate === null
              ? undefined
              : findHoliday(todo.dueDate, holidays)
          }
        />
      ))}
    </ul>
  );
}
