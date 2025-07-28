// Pages & Interface
import Account from "../pages/Account/Account";
import { RoutesProps } from "./interfaces";

export const ACCOUNT_ROUTE: RoutesProps[] = [
  {
    path: "/account/edit",
    component: Account,
  },
];
