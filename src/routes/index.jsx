import { createBrowserRouter } from "react-router-dom";
import Home from "~/pages/home";
import About from "~/pages/about";
import Detail from "~/pages/[id]";
import Login from "~/pages/login";
import Register from "~/pages/register";
import LoginLayout from "~/layout/LoginLayout";
import ForgotPass from "~/pages/forgotPass";
import AdminLayout from "~/layout/AdminLayout";
import Admin from "~/pages/admin";
import Error500 from "~/components/error";


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
        path: "/admin",
        element:<AdminLayout />,
        children:[
            {
                index:true,
                element:<Admin />
            }
        ]
    },
    {
        path: "*",
        element:<Error500 />
    }
])