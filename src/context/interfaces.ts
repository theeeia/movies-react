export interface Context {
  user: string;
  setUser: (arg: string | null) => void;
}
