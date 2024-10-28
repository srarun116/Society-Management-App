import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home/Home"
import "./App.css"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import "bootstrap/dist/css/bootstrap.min.css"
import ForgetPassword from "./components/ForgetPassword/ForgetPassword"
import ResetPassword from "./components/Resetpassword/ResetPassword"
import VerifyOtp from "./components/VerifyOtp/VerifyOtp"



function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgetPassword",
      element: <ForgetPassword />,
    },
    {
      path: "/resetPassword",
      element: <ResetPassword />,
    },
    {
      path: "/verifyOtp",
      element: <VerifyOtp />,
    }

  ])

  return <RouterProvider router={router}></RouterProvider>


}

export default App
