import { validateAuth } from "@/utils/api";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await validateAuth();

      if (response?.data?.isValid) {
        setIsLoggedIn(response.data.isValid);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    } catch (error) {
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
