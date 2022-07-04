import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
);
