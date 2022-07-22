// Pages & Interface
import Account from "../pages/Account/Account";
import Admin from "../pages/Account/Admin";
import { RoutesProps } from "./interfaces";

export const ACCOUNT_ROUTE: RoutesProps[] = [
  {
    path: "/account-edit",
    component: Account,
  },
  {
    path: "/account-privileges",
    component: Admin,
  },
];
