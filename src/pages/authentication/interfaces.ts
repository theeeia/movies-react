export interface loginInput {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface registerInput {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    confirmPassword: string;
    rememberMe: boolean;
  }