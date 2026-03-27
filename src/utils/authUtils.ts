/**
 * Décode un JWT sans vérification de signature (usage frontend seulement)
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
 * Vérifie la présence d'un token et sa validité (expiration)
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
