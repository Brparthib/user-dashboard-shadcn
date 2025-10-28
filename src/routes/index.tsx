import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import UserList from "@/modules/UserList";
import { createBrowserRouter } from "react-router";

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
        Component: UserList,
        path: "user-list",
      },
    ],
  },
]);
