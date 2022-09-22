import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { authQueryClient } from "./hooks/queries/auth";

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
let vw = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vw}px`);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
      <QueryClientProvider client={authQueryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </SnackbarProvider>
);
