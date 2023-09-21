import { createBrowserRouter } from "react-router-dom";
import Home from "~/pages/home";
import About from "~/pages/about";
import Detail from "~/pages/[id]";
import Login from "~/pages/login";
import Register from "~/pages/register";

export const routes = createBrowserRouter([
    {
        path: "/",
        element:<Home/>
    },
    {
        path: "/about",
        element:<About/>
    },
    {
        path: "/:id",
        element:<Detail/>
    },
    {
        path: "/login",
        element:<Login/>
    },
    {
        path: "/register",
        element:<Register/>
    },
    {
        path: "*",
        element:<div>404</div>
    }
])