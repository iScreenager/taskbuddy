import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import List from "./components/List/List";
import Board from "./components/Board/Board";
import Login from "./components/Login/Login";
import { TaskProvider } from "./context/TaskContext";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={"/list"} />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/board",
        element: <Board />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

const viewportContent = isIOS
  ? "width=device-width, initial-scale=1, maximum-scale=1"
  : "width=device-width, initial-scale=1, shrink-to-fit=no";

const metaTag = document.createElement("meta");
metaTag.name = "viewport";
metaTag.content = viewportContent;
document.head.appendChild(metaTag);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <TaskProvider>
        <RouterProvider router={appRouter} />
      </TaskProvider>
    </React.StrictMode>
  );
}
