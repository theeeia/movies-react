import { User } from "firebase/auth";

export interface AuthenticationContext {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
