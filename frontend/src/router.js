import {
    createBrowserRouter,
} from "react-router";

import App from "./App";
import Login from "./views/Login";
import Result from "./views/Result";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {index: true, Component: Login},
            {path: "result", Component: Result}
        ],
    },
]);
