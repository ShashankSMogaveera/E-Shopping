import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Login from "../Components/Login/Login";
import Registeration from "../Components/Registration/Registeration";

const router= createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Navigate to={"/login"} replace/>
            },
            {
                path: "login",
                element: <Login/>,
            },{
                path: "register",
                element: <Registeration/>
            }
        ]   
    },{
        path: '*',
        element: <div className="flex justify-center items-center h-screen text-4xl font-extrabold text-slate-700">page not found 404</div>
    }
])

export default router;