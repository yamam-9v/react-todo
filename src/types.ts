export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };
