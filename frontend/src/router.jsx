import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./views/Login";

const router = createBrowserRouter([
    {
        index: true,
        Component: Login,
    },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />
);
