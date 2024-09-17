import { createContext } from "react";
import type { User } from "../providers/auth-provider";

interface AuthContextType {
  user: User | null;
  authenticate: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authenticate: () => {},
});

export default AuthContext;
