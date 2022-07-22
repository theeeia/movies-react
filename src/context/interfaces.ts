export interface AuthenticationContext {
  user: string;
  setUser: (arg: string | null) => void;
}
