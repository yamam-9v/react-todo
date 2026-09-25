import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { InMemoryTodoRepository } from "./todoRepository";
import type { Todo } from "./types";
import type { Holiday } from "./holidays";

const initialTodos: readonly Todo[] = [
  { id: "1", title: "牛乳を買う", done: false, dueDate: "2026-11-03" },
  { id: "2", title: "掃除をする", done: true, dueDate: null },
];

// 本物の Nager.Date には通信せず、固定の祝日一覧を返す偽物
const holidays: readonly Holiday[] = [
  { date: "2026-11-03", localName: "文化の日" },
];
const fakeFetchHolidays = () => Promise.resolve(holidays);

const user = userEvent.setup();

describe("App", () => {
  beforeEach(() => {
    const repository = new InMemoryTodoRepository(initialTodos);
    render(<App repository={repository} fetchHolidays={fakeFetchHolidays} />);
  });
  afterEach(() => {
    cleanup();
  });

  it("初期表示: initalTodos の2件のタイトルが画面に表示される", async () => {
    expect(await screen.findByText("牛乳を買う")).toBeInTheDocument();
    expect(await screen.findByText("掃除をする")).toBeInTheDocument();
  });
  it("追加: AddTodoForm から新しいタイトルを入力・送信すると､画面に新しい項目が表示される", async () => {
    const inputElement = await screen.findByPlaceholderText("新しいTodo");
    await user.type(inputElement, "テストデータ");
    expect(inputElement).toHaveValue("テストデータ");

    const button = await screen.findByRole("button", { name: "追加" });
    await user.click(button);
    expect(await screen.findByText("テストデータ")).toBeInTheDocument();
  });
  it("トグル: チェックボックス操作が画面の表示に反映される", async () => {
    const textElement = await screen.findByText("牛乳を買う");
    const liElement = textElement.closest("li")!;
    const checkbox = within(liElement).getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
  it("期限日が祝日の Todo に祝日名が表示される", async () => {
    const textElement = await screen.findByText("牛乳を買う");
    const liElement = textElement.closest("li")!;
    const holiday = await within(liElement).findByText(/文化の日/);
    expect(holiday).toBeInTheDocument();
  });
});
