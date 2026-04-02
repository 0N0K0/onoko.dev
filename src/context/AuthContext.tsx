import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/auth/authService";
import apolloClient from "../services/appolloClient";
import {
  VERIFY_TOKEN_MUTATION,
  REFRESH_TOKEN_MUTATION,
} from "../services/auth/authMutations";
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
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [tokenExp, setTokenExp] = useState<number | null>(null);
  const navigate = useNavigate();

  // Détecte l'activité de l'utilisateur pour le rafraîchissement du token
  useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("mousedown", updateActivity);
    window.addEventListener("touchstart", updateActivity);
    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("mousedown", updateActivity);
      window.removeEventListener("touchstart", updateActivity);
    };
  }, []);

  // Vérifie le token auprès de l'API
  const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setTokenExp(null);
      return false;
    }
    try {
      // Décoder l'expiration du token
      const payload = (() => {
        try {
          const p = token.split(".")[1];
          return JSON.parse(atob(p.replace(/-/g, "+").replace(/_/g, "/")));
        } catch {
          return null;
        }
      })();
      if (payload && payload.exp) {
        setTokenExp(payload.exp);
      } else {
        setTokenExp(null);
      }
      // Vérification du token via GraphQL
      const { data } = await apolloClient.mutate<{
        verifyToken: { login: string };
      }>({
        mutation: VERIFY_TOKEN_MUTATION,
        variables: { token },
      });
      if (data && data.verifyToken && data.verifyToken.login) {
        setIsAuthenticated(true);
        setUser(data.verifyToken.login); // Pas d'info user dans la réponse
        return true;
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setTokenExp(null);
        localStorage.removeItem("token");
        return false;
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      setTokenExp(null);
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
      // Décoder l'expiration du token dès le login
      const payload = (() => {
        try {
          const p = token.split(".")[1];
          return JSON.parse(atob(p.replace(/-/g, "+").replace(/_/g, "/")));
        } catch {
          return null;
        }
      })();
      if (payload && payload.exp) {
        setTokenExp(payload.exp);
      } else {
        setTokenExp(null);
      }
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

  const checkAndRefresh = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const payload = (() => {
        try {
          const p = token.split(".")[1];
          return JSON.parse(atob(p.replace(/-/g, "+").replace(/_/g, "/")));
        } catch {
          return null;
        }
      })();
      if (!payload || !payload.exp) return;
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = payload.exp - now;
      // Si actif dans les 10 dernières minutes et token expire dans moins de 5mn
      if (
        Date.now() - lastActivity < 10 * 60 * 1000 &&
        timeLeft < 5 * 60 &&
        timeLeft > 0
      ) {
        // Rafraîchir le token via GraphQL
        const { data } = await apolloClient.mutate<{
          refreshToken: { token: string };
        }>({
          mutation: REFRESH_TOKEN_MUTATION,
          variables: { token },
        });
        if (data && data.refreshToken && data.refreshToken.token) {
          localStorage.setItem("token", data.refreshToken.token);
          await checkAuth();
        }
      }
    } catch {}
  };

  // Planifie le rafraîchissement du token 5 minutes avant son expiration, si l'utilisateur est actif
  useEffect(() => {
    if (!isAuthenticated || !tokenExp) return;
    // Calcul du délai avant expiration - 5mn
    const now = Math.floor(Date.now() / 1000);
    const msBeforeRefresh = (tokenExp - 5 * 60 - now) * 1000;
    if (msBeforeRefresh <= 0) return; // trop tard ou déjà expiré
    const timeout = setTimeout(() => {
      // Rafraîchir seulement si actif dans les 10 dernières minutes
      if (Date.now() - lastActivity < 10 * 60 * 1000) {
        checkAndRefresh();
      }
    }, msBeforeRefresh);
    return () => clearTimeout(timeout);
  }, [isAuthenticated, tokenExp, lastActivity]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
