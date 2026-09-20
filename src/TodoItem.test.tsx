import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "./TodoItem";
import type { Todo } from "./types";

const todo: Todo = {
  id: "1",
  title: "テストデータ",
  done: false,
};
const onToggle = vi.fn<(id: string) => void>();
const onRemove = vi.fn<(id: string) => void>();
const user = userEvent.setup();

describe("TodoItem", () => {
  beforeEach(() => {
    render(<TodoItem todo={todo} onToggle={onToggle} onRemove={onRemove} />);
  });
  afterEach(() => {
    cleanup();
  });

  it("タスクタイトルが表示されるか", () => {
    expect(screen.getByText("テストデータ")).toBeInTheDocument();
  });
  it("チェックボックスが表示されるか", () => {
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
  it("チェックボックスのchecked状態が正しく反映されるか", () => {
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    cleanup();
    const newTodo = {
      ...todo,
      done: true,
    };
    render(<TodoItem todo={newTodo} onToggle={onToggle} onRemove={onRemove} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
  it("チェックボックスをクリックしたらonToggleがtodo.idを引数に呼ばれるか", async () => {
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith(todo.id);
  });
  it("ボタンが表示されるか", () => {
    expect(screen.getByRole("button", { name: "削除" })).toBeInTheDocument();
  });
  it("ボタンをクリックしたらonRemoveがtodo.idを引数に呼ばれるか", async () => {
    const button = screen.getByRole("button", { name: "削除" });
    await user.click(button);
    expect(onRemove).toHaveBeenCalledWith(todo.id);
  });
});
