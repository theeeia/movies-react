export interface EditAccountValues {
  email: string;
  first_name: string;
  last_name: string;
  role: "user" | "admin";
  password?: string;
  confirmPassword?: string;
}
