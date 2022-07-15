import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import { RoutesProps } from "./interfaces";

export const AUTHENTICATION_ROUTES: RoutesProps[] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];
