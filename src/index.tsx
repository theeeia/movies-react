import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/application.scss";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>    
        <App />        
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
