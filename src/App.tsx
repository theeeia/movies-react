import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "./scss/application.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

// Context
import { AuthContext } from "./context/AuthContext";

// Pages
import UnauthenticatedApp from "./page/UnauthenticatedApp";

// Layouts
import AuthenticatedAppLayout from "./layout/AuthenticatedAppLayout";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? <AuthenticatedAppLayout /> : <UnauthenticatedApp />}
      <ToastContainer />
    </>
  );
}
