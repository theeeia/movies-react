export interface EditAccountValues {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
  confirmPassword: string;
}

export type EditParameters = {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password?: string;
};
