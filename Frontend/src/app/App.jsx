import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuth from "../features/auth/hooks/useAuth";
import { use } from "react";
import { useEffect } from "react";
function App() {

  const {handleGetUser} = useAuth()

  useEffect(() => {
    handleGetUser()
  }, [])

  return (
    <>
      <Navbar />
     
       <Outlet />
    
      <Footer />
    </>
  );
}

export default App;