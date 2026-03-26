export function isAuthenticated() {
  // Ex: vérifier la présence d'un token
  return Boolean(localStorage.getItem("token"));
}
