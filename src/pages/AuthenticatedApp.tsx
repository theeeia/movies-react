import { Navigate, Route, Routes } from "react-router-dom";

// Routes
import { HOME_ROUTE } from "../routes/home";
import { ACCOUNT_ROUTE } from "../routes/account";
import { MOVIE_ROUTES } from "../routes/movies";

const AUTHENTICATED_ROUTES = [...HOME_ROUTE, ...ACCOUNT_ROUTE, ...MOVIE_ROUTES];

const AuthenticatedApp = () => {
  return (
    <Routes>
      {AUTHENTICATED_ROUTES.map(route => {
        return <Route key={route.path} path={route.path} element={<route.component />} />;
      })}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AuthenticatedApp;
