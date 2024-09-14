import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
import "../src/App.css";
import { AuthProvider } from "./contexts/auth.context.jsx";
import { ThemeSet } from "./contexts/theme.context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeSet>
          <App />
          <ToastContainer />
        </ThemeSet>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
