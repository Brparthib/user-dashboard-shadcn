import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/providers/themeProvider.tsx";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  </StrictMode>
);
