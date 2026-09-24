import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { JsonServerTodoRepository } from "./todoRepository.ts";

const repository = new JsonServerTodoRepository();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App repository={repository} />
  </StrictMode>,
);
