import { createBrowserRouter } from "react-router-dom";
import Home from "~/pages/home";
import About from "~/pages/about";
import Detail from "~/pages/[id]";

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
        path: "*",
        element:<div>404</div>
    }
])