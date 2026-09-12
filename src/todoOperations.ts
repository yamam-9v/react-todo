import type { Todo } from "./types";

// TODO(human)
// 以下3つの純粋関数を実装してください。
// - toggleTodo: 指定した id の Todo の done を反転した「新しい配列」を返す(元の配列・要素は変更しない)
// - removeTodo: 指定した id の Todo を除いた「新しい配列」を返す
// - addTodo: title から新しい Todo を1件作り、末尾に追加した「新しい配列」を返す
//   (id をどう生成するかは自分で決めてよい。ヒント: crypto.randomUUID() がブラウザ標準で使える)
//
// 制約: 引数の todos や個々の Todo オブジェクトを直接書き換えないこと(4.2節)。
// map / filter / スプレッド構文などで「新しい配列・新しいオブジェクト」を作って返す。

export function toggleTodo(todos: readonly Todo[], id: string): readonly Todo[] {
  const todo = todos.filter((item) => item.id === id)[0];
  if (!todo) return todos;

  const newTodos = todos.map((item) => 
    item.id === id
      ? { ...item, done: !item.done }
      : item
  );

  return newTodos;
}

export function removeTodo(todos: readonly Todo[], id: string): readonly Todo[] {
  const todo = todos.filter((item) => item.id === id)[0];
  if (!todo) return todos;

  const newTodos = todos.filter((item) => item.id !== id);

  return newTodos;
}

export function addTodo(todos: readonly Todo[], title: string): readonly Todo[] {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    done: false
  }
  
  const newTodos: Todo[] = [...todos, newTodo];
  return newTodos;
}
