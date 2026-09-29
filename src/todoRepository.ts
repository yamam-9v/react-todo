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

const STORAGE_KEY = "react-todo:todos";

const INITIAL_TODOS: readonly Todo[] = [
  {
    id: "1",
    title: "Reactの基礎を学ぶ",
    done: false,
    dueDate: null,
  },
  {
    id: "2",
    title: "useStateを理解する",
    done: true,
    dueDate: null,
  },
  {
    id: "3",
    title: "propsとkeyを理解する",
    done: false,
    dueDate: null,
  },
];

// GitHub Pages(json-server が無い環境)向け。Todo 一覧を localStorage に丸ごと保存する。
// localStorage は同期 API だが、インターフェースに合わせて Promise を返す。
// Promise.resolve().then(...) で包むのは、read() が throw したときに
// 同期的な例外ではなく reject された Promise として呼び出し元に届けるため。
export class LocalStorageTodoRepository implements TodoRepository {
  list(): Promise<readonly Todo[]> {
    return Promise.resolve().then(() => this.read());
  }

  create(input: TodoInput): Promise<Todo> {
    return Promise.resolve().then(() => {
      const newTodo: Todo = { id: crypto.randomUUID(), ...input, done: false };
      this.write([...this.read(), newTodo]);
      return newTodo;
    });
  }

  update(id: string, patch: Partial<Omit<Todo, "id">>): Promise<Todo> {
    return Promise.resolve().then(() => {
      const todos = this.read();
      const target = todos.find((todo) => todo.id === id);
      if (!target) {
        throw new Error(`Todoが見つかりません: ${id}`);
      }
      const updated: Todo = { ...target, ...patch };
      this.write(todos.map((todo) => (todo.id === id ? updated : todo)));
      return updated;
    });
  }

  remove(id: string): Promise<void> {
    return Promise.resolve().then(() => {
      this.write(this.read().filter((todo) => todo.id !== id));
    });
  }

  // localStorage から Todo 一覧を読み出して検証する。
  // 読めない・形が違うデータは初期データに倒す(次の write で上書きされて消える)。
  // デモ用ビルドなので、壊れたデータの救出より CRUD をすぐ見せることを優先している。
  private read(): readonly Todo[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data === null) return INITIAL_TODOS;

    try {
      const value: unknown = JSON.parse(data);
      return TodoListSchema.parse(value);
    } catch {
      return INITIAL_TODOS;
    }
  }

  private write(todos: readonly Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}
