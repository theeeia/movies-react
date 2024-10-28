// Pages & Interface
import Account from "../page/Account/Account";
import AccountPrivileges from "../page/Account/AccountPrivileges";
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
