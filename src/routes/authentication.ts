// Pages & Interface
import Login from "../page/authentication/Login";
import Register from "../page/authentication/Register";
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
