import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/components/service/contexts/AuthContext";

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider> {/* ✅ Add this wrapper */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
