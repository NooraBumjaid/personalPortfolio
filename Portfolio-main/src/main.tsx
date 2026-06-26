import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { basePath } from "@/lib/paths";
import "@/src/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basePath || undefined}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
