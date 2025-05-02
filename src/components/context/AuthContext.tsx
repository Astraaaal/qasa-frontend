import { type Result, tryCatch } from "@/lib/try-catch";
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import { loginUser } from "../service/api/auth";

interface AuthContextProps {
  accessToken: string;
  expiresIn: number;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth can only be used within AuthProvider");

  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);
  const [loading, setIsLoading] = useState(false);

  async function login(username: string, password: string) {
    setIsLoading(true);

    const { data, error } = await tryCatch(loginUser(username, password));

    // just throw the error
    if (error) {
      setIsLoading(false);
      throw error;
    }

    console.log(data);
    // save access token and expiry in state
    console.log("Access Token (from data):", data.accessToken);
    console.log("Expires In (from data):", data.expiresIn, "Now:", Date.now());

    setAccessToken(data.accessToken);
    // // save to milliseconds since Date.now is using Unix Epoch
    setExpiresIn(Date.now() + data.expiresIn * 1000);
    localStorage.setItem("token", accessToken);
    // setIsLoading(false);
    // console.log("Access Token:", accessToken);
    // console.log("Expires In:", expiresIn, "Now:", Date.now());

    setIsLoading(false);
    return true;
  }

  function logout() {
    setAccessToken(null);
    setExpiresIn(null);
  }

  // isAuthenticated is true if
  // accessToken exists
  // expiresAt exits
  // current time is before token expiry time
  const isAuthenticated =
    !!accessToken && !!expiresIn && Date.now() < expiresIn;

  const value: AuthContextProps = {
    accessToken,
    expiresIn,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
