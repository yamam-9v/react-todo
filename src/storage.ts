import type { Todo } from "./types";

function isValidTodo(value: unknown): value is Todo {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;

  if (typeof candidate.id !== "string") return false;
  if (typeof candidate.title !== "string") return false;
  if (typeof candidate.done !== "boolean") return false;

  return true;
}

export function isValidTodos(value: unknown): value is Todo[] {
  if (!Array.isArray(value)) return false;
  return value.every(isValidTodo);
}

// localStorage から key で読み込んだ値を、isValid で検証してから返す。
// - キーが存在しない、JSON として壊れている、isValid が false を返す
//   のいずれの場合も null を返す(呼び出し元をクラッシュさせない)。
export function loadFromStorage<T>(
  key: string,
  isValid: (value: unknown) => value is T,
): T | null {
  const data = localStorage.getItem(key);
  if (data === null) return null;

  try {
    const value: unknown = JSON.parse(data);
    if (isValid(value)) return value;
    return null;
  } catch {
    return null;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
