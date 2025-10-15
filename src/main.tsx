import React from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from './contexts/AuthContext'
import { BrainwaveProvider } from './contexts/BrainwaveContext'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrainwaveProvider>
        <App />
      </BrainwaveProvider>
    </AuthProvider>
  </React.StrictMode>
);
