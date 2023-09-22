import { createBrowserRouter } from "react-router-dom";
import Home from "~/pages/home";
import About from "~/pages/about";
import Detail from "~/pages/[id]";
import Login from "~/pages/login";
import Register from "~/pages/register";
import LoginLayout from "~/layout/LoginLayout";
import ForgotPass from "~/pages/forgotPass";


export const routes = createBrowserRouter([
    {
        path: "/",
        element:<Home/>
    },
    {
        path: "/about",
        element:<About/>,
        
    },
    {
        path: "/page/:id",
        element:<Detail/>
    },
    {
        path:"/",
        element:<LoginLayout/>,
        children:[
            {
                path:"login",
                element:<Login/>
            },
            {
                path: "register",
                element:<Register/>
            },
            {
                path:"forgotpass",
                element:<ForgotPass/>
            }
        ]
    },
    {
        path: "*",
        element:<div>404</div>
    }
])