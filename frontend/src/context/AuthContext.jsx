import React, { useState, useEffect, createContext, useContext  } from "react";
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks/useUser";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(undefined);
  const { getMe } = useUser();

  const login = async (token) => {
    setToken(token);
    try {
      const me = await getMe(token);
      setAuth({ token, me });
    } catch (error) {
      // Token inválido o vencido: se limpia la sesión
      removeToken();
      setAuth(null);
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
      return;
    }
    login(token).catch(() => {});
  }, []);

  // Evita el parpadeo del login mientras se revisa la sesión guardada
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}