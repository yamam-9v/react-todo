import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { JsonServerTodoRepository } from "./todoRepository.ts";
import { fetchCaoHolidaysCsv, fetchHolidays } from "./holidays.ts";

const repository = new JsonServerTodoRepository();

// ステップ12の実験用: 内閣府CSVを取得できるか確認する(ステップ12-aで削除)
fetchCaoHolidaysCsv()
  .then((text) => {
    console.log("内閣府CSV 取得成功:", text.length, "文字");
    console.log(text.slice(0, 100));
  })
  .catch((error: unknown) => {
    console.error("内閣府CSV 取得失敗:", error);
  });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App repository={repository} fetchHolidays={fetchHolidays} />
  </StrictMode>,
);
