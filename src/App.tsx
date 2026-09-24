import { useEffect, useState } from "react";
import type { AsyncState, Todo } from "./types";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";
import { addTodo, removeTodo, toggleTodo } from "./todoOperations";
import type { TodoRepository } from "./todoRepository";

interface AppProps {
  repository: TodoRepository;
}

function App({ repository }: AppProps) {
  const [state, setState] = useState<AsyncState<readonly Todo[]>>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    repository
      .list()
      .then((data) => {
        if (cancelled) return;
        setState({ status: "success", data });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "不明なエラーが発生しました",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [repository]);

  const handleToggle = (id: string) => {
    if (state.status !== "success") return;
    const target = state.data.find((todo) => todo.id === id);
    if (!target) return;
    repository
      .update(id, { done: !target.done })
      .then(() => {
        setState({ status: "success", data: toggleTodo(state.data, id) });
      })
      .catch((error: unknown) => {
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "不明なエラーが発生しました",
        });
      });
  };

  const handleRemove = (id: string) => {
    if (state.status !== "success") return;
    repository
      .remove(id)
      .then(() => {
        setState({ status: "success", data: removeTodo(state.data, id) });
      })
      .catch((error: unknown) => {
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "不明なエラーが発生しました",
        });
      });
  };

  const handleAdd = (title: string) => {
    if (state.status !== "success") return;
    repository
      .create({ title })
      .then((newTodo) => {
        setState({ status: "success", data: addTodo(state.data, newTodo) });
      })
      .catch((error: unknown) => {
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "不明なエラーが発生しました",
        });
      });
  };

  if (state.status === "loading") {
    return <p>読み込み中...</p>;
  }

  if (state.status === "error") {
    return <p>エラーが発生しました: {state.message}</p>;
  }

  return (
    <>
      <AddTodoForm onAdd={handleAdd} />
      <TodoList
        todos={state.data}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    </>
  );
}

export default App;
