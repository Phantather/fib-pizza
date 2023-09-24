import {useRoutes} from "react-router-dom"
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Register from "../pages/Register/Register";
import Map from "../pages/Map/Map";
import Cart from "../pages/Cart/Cart";
import OneProduct from "../pages/OneProduct/OneProduct";
import Login from "../pages/Login/Login";
import {get} from "react-hook-form";
import Panel from "../pages/Panel/Panel";
import Profile from "../pages/Profile/Profile";
import Placing from "../pages/Placing/Placing";
import Ordered from "../pages/Ordered/Ordered";

export default function Router () {
    const getUser  = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""

    const routes = useRoutes([
        {
            path: '',
            element: <Layout/>,
            children: [
                {path: '/', element: <Home/>},
                {path: '/about', element: <About/>},
                {path: '/map', element: <Map/>},
                {path: '/cart', element: <Cart/>},
                {path: '/placing', element: <Placing/>},

                {path: '/product/:id', element: <OneProduct/>},
                {path: '/profile', element: <Profile/>},
                {path: '/ordered', element: <Ordered/>}

            ]
        },
                {path: '/panel', element: <Panel/>},
                {path: '/register', element: <Register/>} ,
                {path: '/login', element: <Login/>}

    ])
    return routes
}