export interface AccountValues {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface EditAccountValues {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: any;
  confirmPassword: string;
}
