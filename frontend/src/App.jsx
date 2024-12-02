
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard";
import EditProfile from "./components/Profile/EditProfile";
import FinanceManagement from "./components/FinancialManagement/FinanceManagement";
import FacilityManagement from "./components/FacilityManagement/FacilityManagement";
import ComplaintTracking from "./components/ComplaintTracking/ComplaintTracking";
import SecurityManagement from "./components/SecurityManagement/SecurityManagement";
import SecurityGuard from "./components/SecurityGuard/SecurityGuard";
import Announcement from "./components/Announcement/Announcement";
import FinancialIncome from "./components/FinancialManagement/FinancialIncome";
import FinancialExpense from "./components/FinancialManagement/FinancialExpense";
import FinancialNote from "./components/FinancialManagement/FinancialNote";
import VisitorLogs from "./components/SecurityManagement/VisitorLogs";
import SecurityProtocols from "./components/SecurityManagement/SecurityProtocols";
import CreateComplaint from "./components/ComplaintTracking/CreateComplaint";
import RequestTracking from "./components/ComplaintTracking/RequestTracking";

// Register and login
import Register from "./components/Register/Register";
import Login from "./components/Login/Login"
import ForgetPassword from "./components/ForgetPassword/ForgetPassword"
import VerifyOtp from "./components/VerifyOtp/VerifyOtp"
import ResetPassword from "./components/Resetpassword/ResetPassword"
import Rm from "./components/ResidentManagement/ResidentManagement";
import ResidentForm from "./components/ResidentManagement/ResidentForm";
import TenantForm from "./components/ResidentManagement/TenantForm";






const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/ResidentManagement",
          element: <Rm />,
        },
        {
          path: "/addresidents",
          element: <ResidentForm />
        },
        {
          path: "/TenantForm",
          element: <TenantForm />
        }, {
          path: "/ownerForm",
          element: <ResidentForm />
        }
        ,
        {
          path: "/FinancialManagement",
          element: <FinanceManagement />,
          children: [
            {
              path: "Income",
              element: <FinancialIncome />
            },
            {
              path: "Expense",
              element: <FinancialExpense />
            },
            {
              path: "Note",
              element: <FinancialNote />
            }
          ]
        },
        {
          path: "/FacilityManagement",
          element: <FacilityManagement />,
        },
        {
          path: "/ComplaintTracking",
          element: <ComplaintTracking />,
          children: [
            {
              path: "CreateComplaint",
              element: <CreateComplaint />
            },
            {
              path: "RequestTracking",
              element: <RequestTracking />
            }
          ]
        },
        {
          path: "/SecurityManagement",
          element: <SecurityManagement />,
          children: [
            {
              path: "VisitorLogs",
              element: <VisitorLogs />
            },
            {
              path: "SecurityProtocols",
              element: <SecurityProtocols />
            }
          ]
        },
        {
          path: "/SecurityGuard",
          element: <SecurityGuard />,
        },
        {
          path: "/Announcement",
          element: <Announcement />,

        },
        {
          path: "/EditProfile",
          element: <EditProfile/>,
        },

      ],

    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/forgetPassword",
      element: <ForgetPassword />,
    },
    {
      path: "/verifyOtp",
      element: <VerifyOtp />,
    },
    {
      path: "/resetPassword",
      element: <ResetPassword />,
    }


  ]
  , {
    future: {
      v7_startTransition: true, // Enable v7 startTransition behavior
    },
  })


  return <RouterProvider router={router} />
}


export default App;