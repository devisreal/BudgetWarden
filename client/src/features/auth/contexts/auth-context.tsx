import { type ReactNode, createContext, useEffect, useState } from "react";

import { validateAuth } from "../../../utils/api";

type AuthContextValue = {
  isLoggedIn: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider(props: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await validateAuth();

      if (response && response.data?.isValid) {
        setIsLoggedIn(response.data.isValid);
      } else {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        error.status === 401
      ) {
        localStorage.removeItem("authToken");
        return;
      }
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
