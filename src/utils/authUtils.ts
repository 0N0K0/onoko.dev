/**
 * Décode le payload d'un token JWT.
 * @returns Le payload décodé, ou null en cas d'erreur.
 */
export function decodeJwt(token: string): Record<string, any> | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}
