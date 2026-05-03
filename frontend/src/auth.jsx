import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(() => {
    try {
      const saved =
        localStorage.getItem(
          "loancrm_user"
        );

      return saved
        ? JSON.parse(saved)
        : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "loancrm_user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(
        "loancrm_user"
      );
    }
  }, [user]);

  const login = (userData) =>
    setUser(userData);

  const logout = () =>
    setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}

export function ProtectedRoute({
  children,
}) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}