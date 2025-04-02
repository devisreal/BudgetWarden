import { validateAuth } from "@/utils/api";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    const loggedInStatus = await validateAuth();
    setIsLoggedIn(loggedInStatus);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={isLoggedIn}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
