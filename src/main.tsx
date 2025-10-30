import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/providers/themeProvider.tsx";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";
import AppProvider from "./provider/AppProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="bottom-right" />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>
);
