import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./App";
import "./index.css";

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
let vw = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vw}px`);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>
);
