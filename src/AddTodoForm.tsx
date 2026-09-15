import { useState } from "react";

interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() === "") return;
    onAdd(newTitle);
    setNewTitle("");
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="新しいTodo"
      />
      <button type="submit">追加</button>
    </form>
  );
}
