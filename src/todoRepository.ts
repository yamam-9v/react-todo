import { z } from "zod";
import { TodoSchema, type Todo } from "./types";

const TodoListSchema = z.array(TodoSchema);

type TodoInput = Omit<Todo, "id" | "done">;

export interface TodoRepository {
  list(): Promise<readonly Todo[]>;
  create(input: TodoInput): Promise<Todo>;
  update(id: string, patch: Partial<Omit<Todo, "id">>): Promise<Todo>;
  remove(id: string): Promise<void>;
}

const BASE_URL = "http://localhost:3001/todos";

async function parseJsonResponse<T>(
  response: Response,
  schema: z.ZodType<T>,
): Promise<T> {
  if (!response.ok) {
    throw new Error(
      `APIリクエストに失敗しました: ${response.status} ${response.statusText}`,
    );
  }
  const data: unknown = await response.json();
  return schema.parse(data);
}

export class JsonServerTodoRepository implements TodoRepository {
  async list(): Promise<readonly Todo[]> {
    const response = await fetch(BASE_URL);
    return parseJsonResponse(response, TodoListSchema);
  }

  async create(input: TodoInput): Promise<Todo> {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...input, done: false }),
    });
    return parseJsonResponse(response, TodoSchema);
  }

  async update(id: string, patch: Partial<Omit<Todo, "id">>): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    return parseJsonResponse(response, TodoSchema);
  }

  async remove(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(
        `APIリクエストに失敗しました: ${response.status} ${response.statusText}`,
      );
    }
  }
}

export class InMemoryTodoRepository implements TodoRepository {
  private todos: readonly Todo[];

  constructor(initialTodos: readonly Todo[] = []) {
    this.todos = initialTodos;
  }

  list(): Promise<readonly Todo[]> {
    return Promise.resolve(this.todos);
  }

  create(input: TodoInput): Promise<Todo> {
    const newTodo: Todo = { id: crypto.randomUUID(), ...input, done: false };
    this.todos = [...this.todos, newTodo];
    return Promise.resolve(newTodo);
  }

  update(id: string, patch: Partial<Omit<Todo, "id">>): Promise<Todo> {
    const target = this.todos.find((todo) => todo.id === id);
    if (!target) {
      return Promise.reject(new Error(`Todoが見つかりません: ${id}`));
    }
    const updated: Todo = { ...target, ...patch };
    this.todos = this.todos.map((todo) => (todo.id === id ? updated : todo));
    return Promise.resolve(updated);
  }

  remove(id: string): Promise<void> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return Promise.resolve();
  }
}
