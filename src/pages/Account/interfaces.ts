export interface EditAccountValues {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  role: "user" | "admin";
  confirmPassword?: string;
}
