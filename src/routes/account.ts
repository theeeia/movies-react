// Pages & Interface
import Account from "../pages/Account/Account";
import AccountPrivileges from "../pages/Account/AccountPrivileges";
import { RoutesProps } from "./interfaces";

export const ACCOUNT_ROUTE: RoutesProps[] = [
  {
    path: "/account/edit",
    component: Account,
  },
  {
    path: "/account/privileges",
    component: AccountPrivileges,
  },
];
