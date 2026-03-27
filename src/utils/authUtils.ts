/**
 * Utilitaires liés à l'authentification, notamment la gestion des tokens JWT et la vérification de l'état d'authentification de l'utilisateur.
 * Fournit des fonctions pour décoder les tokens JWT et vérifier leur validité en fonction de leur date d'expiration.
 * @param {string} token Le token JWT à décoder.
 * @returns {any | null} Le payload décodé du token, ou null en cas d'erreur de décodage.
 */
function decodeJwt(token: string): any | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

/**
 * Vérifie si l'utilisateur est actuellement authentifié en vérifiant la présence d'un token JWT valide dans le stockage local.
 * Décodé le token pour vérifier sa date d'expiration et s'assurer qu'il est encore valide.
 * @returns {boolean} true si l'utilisateur est authentifié, false sinon.
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const payload = decodeJwt(token);
  if (!payload || !payload.exp) return false;
  // exp est en secondes depuis epoch
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
}
