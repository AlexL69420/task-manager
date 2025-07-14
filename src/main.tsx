import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.tsx";
import "./index.css";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import TaskDetailsPage from "./pages/TaskDetailsPage.tsx";
import { TaskProvider } from "./contexts/TaskContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/task/:id",
    element: <TaskDetailsPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <TaskProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
    ,
  </TaskProvider>,
);
