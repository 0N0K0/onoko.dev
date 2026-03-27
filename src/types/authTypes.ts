export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
  login: (login: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}
