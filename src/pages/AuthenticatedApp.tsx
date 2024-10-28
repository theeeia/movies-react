import { Route, Routes } from "react-router-dom";

// Routes
import { ACCOUNT_ROUTE } from "../routes/account";
import { MOVIE_ROUTES } from "../routes/movies";
import Reroute from "../components/Reroute/Reroute";

const AUTHENTICATED_ROUTES = [...ACCOUNT_ROUTE, ...MOVIE_ROUTES];

const AuthenticatedApp = () => {
  return (
    <Routes>
      {AUTHENTICATED_ROUTES.map(route => {
        return <Route key={route.path} path={route.path} element={<route.component />} />;
      })}
      <Route path="*" element={<Reroute />} />
    </Routes>
  );
};

export default AuthenticatedApp;
