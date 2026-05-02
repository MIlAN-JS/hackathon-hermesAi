import { createBrowserRouter } from "react-router-dom";
import App from "./App"; // acts as MainLayout (navbar + footer)
import LandingLayout from "./LandingLayout";

import SignIn from "../features/auth/ui/SignIn";
import LandingPage from "../features/Home/ui/LandingPage";
import PricingSection from "../features/Pricing/ui/Pricing";

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
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/pricing",
        element: <PricingSection />,
      },
    ],
  },
]);