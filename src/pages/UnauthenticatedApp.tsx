import { Navigate, Route, Routes } from "react-router-dom";

// Routes
import { AUTHENTICATION_ROUTES } from "../routes/authentication";

const UNAUTHENTICATED_ROUTES = [...AUTHENTICATION_ROUTES];

const UnauthenticatedApp = () => {
  return (
    <Routes>
      {UNAUTHENTICATED_ROUTES.map(route => {
        return <Route key={route.path} path={route.path} element={<route.component />} />;
      })}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default UnauthenticatedApp;
