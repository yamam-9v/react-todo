import { describe, it, expect } from "vitest";
import { addTodo, removeTodo, toggleTodo } from "./todoOperations";
import type { Todo } from "./types";

//テストデータ生成用関数 アイテムごとにdoneプロパティのtrue/falseを決める
function makeTodos(items: readonly boolean[]): Todo[] {
  return items.map((done, index) => {
    const id = String(index + 1);
    return {
      id,
      title: `テストデータ${id}`,
      done,
      dueDate: null,
    };
  });
}

describe("toggleTodo", () => {
  it("対象のidが存在する時､対象のdoneプロパティをトグルした新しいTodo[]を返す", () => {
    expect(toggleTodo(makeTodos([true, true, true]), "1")).toEqual(
      makeTodos([false, true, true]),
    );
  });
  it("対象のidが存在しない時､Todo[]をそのまま返す", () => {
    expect(toggleTodo(makeTodos([true, false, false]), "6")).toEqual(
      makeTodos([true, false, false]),
    );
  });
});
describe("removeTodo", () => {
  it("対象のidが存在する時､対象の要素を削除した新しいTodo[]を返す", () => {
    expect(removeTodo(makeTodos([true, true, false]), "3")).toEqual(
      makeTodos([true, true]),
    );
  });
  it("対象のidが存在しない時､Todo[]をそのまま返す", () => {
    expect(removeTodo(makeTodos([true, false, false]), "6")).toEqual(
      makeTodos([true, false, false]),
    );
  });
});
describe("addTodo", () => {
  const newTodo: Todo = {
    id: "100",
    title: "新しいTodo",
    done: false,
    dueDate: null,
  };
  it("newTodoが存在する時､新しいTodoを末尾に追加した新しいTodo[]を返す", () => {
    expect(addTodo(makeTodos([true, true, false]), newTodo)).toEqual([
      ...makeTodos([true, true, false]),
      newTodo,
    ]);
  });
});
