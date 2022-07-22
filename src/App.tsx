import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "./scss/application.scss";

// Context
import { AuthContext } from "./context/AuthContext";

//Pages
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";



export default function App() {
  const { user } = useContext(AuthContext);

  return  (
   <>
    {user ? <AuthenticatedApp /> :  <UnauthenticatedApp />}
    <ToastContainer />
   </>
   )

}
