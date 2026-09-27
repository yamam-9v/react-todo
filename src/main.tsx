import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { JsonServerTodoRepository } from "./todoRepository.ts";
// 祝日の取得元: fetchHolidays(Nager.Date)/ fetchCaoHolidays(内閣府CSV)
import { fetchCaoHolidays } from "./holidays.ts";

const repository = new JsonServerTodoRepository();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App repository={repository} fetchHolidays={fetchCaoHolidays} />
  </StrictMode>,
);
