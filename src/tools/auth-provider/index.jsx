"use client";

import { getUser } from "@/requests/user";
import { postLogout } from "@/requests/user/auth/logout";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const logout = useCallback(() => {
    postLogout().then(() => location.reload());
  }, []);

  const refresh = useCallback(() => {
    return new Promise((resolve, reject) => {
      getUser()
        .then((user) => {
          setUser(user);
          resolve(user);
        })
        .catch((error) => {
          if (user) {
            logout();
            return;
          }

          reject(error);
        });
    });
  }, [user]);

  useEffect(() => {
    refresh();
  }, []);

  const contextValue = useMemo(
    () => ({ user, isLoggedIn: user !== null, refresh, logout }),
    [user, refresh, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
