import {
    createBrowserRouter,
} from "react-router";

import App from "./App";
import Login from "./views/Login";
import Result from "./views/Result";
import CreateAccount from "./views/CreateAccount";
import ProtectedRoute from "./views/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Login },
      { path: "create-account", Component: CreateAccount },
      {
        path: "result",
        element: (
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
