import { useState } from "react";

interface AddTodoFormProps {
  onAdd: (title: string, dueDate: string | null) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() === "") return;
    // <input type="date"> は未入力時に "" を返すので、スキーマに合わせて null に変換する
    onAdd(newTitle, newDueDate === "" ? null : newDueDate);
    setNewTitle("");
    setNewDueDate("");
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="新しいTodo"
      />
      <input
        type="date"
        value={newDueDate}
        onChange={(e) => setNewDueDate(e.target.value)}
        aria-label="期限日"
      />
      <button type="submit">追加</button>
    </form>
  );
}
