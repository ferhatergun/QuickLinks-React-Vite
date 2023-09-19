import { createBrowserRouter } from "react-router-dom";
import Home from "~/pages/home";
import About from "~/pages/about";

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
        path: "*",
        element:<div>404</div>
    }
])