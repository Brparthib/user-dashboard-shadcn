import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { SidebarItems } from "./SidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
  },
  {
    Component: DashboardLayout,
    path: "/dashboard",
    children: [
      {
        index: true,
        element: <div>Dashboard Home</div>,
      },
      ...generateRoutes(SidebarItems),
    ],
  },
]);