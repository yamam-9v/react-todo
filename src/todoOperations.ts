import type { Todo } from "./types";

export function toggleTodo(
  todos: readonly Todo[],
  id: string,
): readonly Todo[] {
  const todo = todos.filter((item) => item.id === id)[0];
  if (!todo) return todos;

  const newTodos = todos.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item,
  );

  return newTodos;
}

export function removeTodo(
  todos: readonly Todo[],
  id: string,
): readonly Todo[] {
  const todo = todos.filter((item) => item.id === id)[0];
  if (!todo) return todos;

  const newTodos = todos.filter((item) => item.id !== id);

  return newTodos;
}

export function addTodo(
  todos: readonly Todo[],
  title: string,
): readonly Todo[] {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    done: false,
  };

  const newTodos: Todo[] = [...todos, newTodo];
  return newTodos;
}
