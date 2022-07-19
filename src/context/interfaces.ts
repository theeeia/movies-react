export interface User {
  email: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface Context {
  user: User;
  expireTime: string;
  rememberMe: boolean;
  loginUser: (arg: Login) => void;
  registerUser: (arg: Register) => void;
  logoutUser: () => void;
  updateToken: () => void;
  clearUserFromStorage: () => void;
}

export interface Login {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface Register {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
