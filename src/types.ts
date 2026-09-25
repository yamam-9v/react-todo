import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "タイトルは必須です"),
  done: z.boolean(),
  dueDate: z.iso.date().nullable(),
});

export type Todo = z.infer<typeof TodoSchema>;

export type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };
