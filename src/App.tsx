import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "./scss/application.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Context
import { AuthContext } from "./context/AuthContext";

//Pages
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";

export default function App() {
  const { user } = useContext(AuthContext);
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}
