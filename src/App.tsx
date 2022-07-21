import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import "./scss/application.scss";

export default function App() {
  const { user } = useContext(AuthContext);

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
