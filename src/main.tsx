import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  JsonServerTodoRepository,
  LocalStorageTodoRepository,
  type TodoRepository,
} from "./todoRepository.ts";
// 祝日の取得元: fetchHolidays(Nager.Date)/ fetchCaoHolidays(内閣府CSV)/ getBundledHolidays(埋め込み)
import { fetchCaoHolidays, type Holiday } from "./holidays.ts";
import { getBundledHolidays } from "./bundledHolidays.ts";

// デモ用ビルド(npm run build:demo → GitHub Pages)かどうか。
// json-server も Vite の proxy も無い環境なので、注入するものを差し替える。
const isDemo = import.meta.env.MODE === "demo";

const repository: TodoRepository = isDemo
  ? new LocalStorageTodoRepository()
  : new JsonServerTodoRepository();
const fetchHolidays: (year: number) => Promise<readonly Holiday[]> = isDemo
  ? getBundledHolidays
  : fetchCaoHolidays;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App repository={repository} fetchHolidays={fetchHolidays} />
  </StrictMode>,
);
