/**
 * Основной модуль приложения, отвечающий за рендеринг React-приложения.
 * @module MainApp
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@indexStore";
import App from "@App";
import "../index.css";
import NotFoundPage from "@NotFoundPage";
import TaskForm from "@TaskForm";

/**
 * Корневой компонент макета приложения.
 * @function RootLayout
 * @returns {JSX.Element} Возвращает JSX-разметку, включающую главное приложение и дочерние маршруты.
 * @description Обеспечивает базовый макет для всех страниц приложения.
 */
const RootLayout = () => {
  return (
    <>
      <App />
      <Outlet />
    </>
  );
};

/**
 * Конфигурация маршрутизатора приложения.
 * @constant {Object} router
 * @type {import('react-router-dom').BrowserRouter}
 * @description Определяет все маршруты приложения и их соответствующие компоненты.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "task/:id",
        element: <TaskForm />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

/**
 * Точка входа в приложение.
 * @function renderApp
 * @description Рендерит React-приложение в корневой DOM-элемент.
 * @param {HTMLElement} rootElement - Корневой DOM-элемент для рендеринга.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
