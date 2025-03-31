import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import App from "./App.jsx";
import "./assets/fonts/typography.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      closeButton
      richColors
      toastOptions={{
        style: {
          fontFamily: "var(--font-sans)",
          fontSize: ".9rem",
        },
      }}
    />
    <App />
  </StrictMode>,
);
