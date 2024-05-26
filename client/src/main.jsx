import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Router> */}
    <AuthProvider>
      <SnackbarProvider autoHideDuration={3000}>
        <App />
      </SnackbarProvider>
    </AuthProvider>
    {/* </Router> */}
  </React.StrictMode>
);
