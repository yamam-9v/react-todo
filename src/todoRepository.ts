import type { Todo } from "./types";

type TodoInput = Omit<Todo, "id" | "done">;

export interface TodoRepository {
  list(): Promise<readonly Todo[]>;
  create(input: TodoInput): Promise<Todo>;
  update(id: string, patch: Partial<Omit<Todo, "id">>): Promise<Todo>;
  remove(id: string): Promise<void>;
}
