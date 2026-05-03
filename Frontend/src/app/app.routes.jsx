import { createBrowserRouter } from "react-router-dom";
import App from "./App"; // acts as MainLayout (navbar + footer)
import LandingLayout from "./LandingLayout";

import SignIn from "../features/auth/ui/SignIn";
import LandingPage from "../features/Home/ui/LandingPage";
import PricingSection from "../features/Pricing/ui/Pricing";
import Dashboard from "../features/Dashboard/ui/Dashboard";
import ConfigBot from "../features/bots/ui/ConfigBot";
import Login from "../features/auth/ui/Login";
import PrivateRoute from "./Private";

export const router = createBrowserRouter([
  // Landing (NO navbar/footer)
  {
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },

  // Main app (WITH navbar/footer)
  {
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/pricing",
        element: <PricingSection />,
      },
      {
        path:"/dashboard",
        element:<PrivateRoute><Dashboard/></PrivateRoute>
      }, 
      {
        path : "/bots", 
        element :<PrivateRoute><ConfigBot/></PrivateRoute> 
      }, {

      }
    ],
  },
]);