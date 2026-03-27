import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/authService";
import type { AuthContextType } from "../types/authTypes";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

/**
 * Fournit le contexte d'authentification pour l'application, gérant l'état de l'utilisateur, les fonctions de login/logout, et la vérification du token.
 * @param {React.ReactNode} children Les composants enfants qui auront accès au contexte d'authentification.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Vérifie le token auprès de l'API
  const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const url = new URL("/verify-token", apiUrl).href;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setIsAuthenticated(true);
        try {
          const data = await res.json();
          setUser(data.user || null);
        } catch {
          setUser(null);
        }
        return true;
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
        return false;
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("token");
      return false;
    }
  };

  // Login centralisé
  const login = async (
    loginValue: string,
    password: string,
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const token = await loginApi(loginValue, password);
      localStorage.setItem("token", token);
      const ok = await checkAuth();
      setLoading(false);
      return ok;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Logout centralisé
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  // Vérification initiale au chargement
  useEffect(() => {
    (async () => {
      setLoading(true);
      await checkAuth();
      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
