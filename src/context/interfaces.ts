export interface User {
  email: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface Context {
  user: User;
  setUser:( arg: string | null) => void;
  logoutUser: () => void;
}

