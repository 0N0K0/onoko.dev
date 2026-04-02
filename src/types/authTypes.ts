/**
 * Ce fichier définit les types TypeScript liés à l'authentification, notamment le type AuthContextType qui décrit la structure du contexte d'authentification utilisé dans l'application.
 * Il inclut des propriétés pour indiquer si l'utilisateur est authentifié, s'il y a un chargement en cours, les informations de l'utilisateur, ainsi que des méthodes pour se connecter, se déconnecter et vérifier l'authentification.
 */

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
  login: (login: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  returnButton: {
    to: string;
    text: string;
    disabled: boolean;
  };
  submitButton: {
    text: string;
    disabled: boolean;
  };
  onSubmit?: (e: React.FormEvent) => void;
  hasResetPasswordLink?: boolean;
}
