import { API_URL, LOGIN_ROUTE } from "../constants/apiConstants";
import { joinUrl } from "../utils/urlUtils";

/**
 * Service d'authentification pour gérer les interactions avec l'API d'authentification.
 * Fournit une fonction de login qui envoie les identifiants de l'utilisateur au backend et récupère un token d'authentification en cas de succès.
 * Gère également les erreurs de connexion, notamment les problèmes de réseau ou les réponses invalides du serveur.
 */
export async function loginApi(
  login: string,
  password: string,
): Promise<string> {
  try {
    const response = await fetch(joinUrl(API_URL, LOGIN_ROUTE), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });
    if (!response.ok) {
      throw new Error("Échec de l'authentification");
    }
    const data = await response.json();
    if (!data.token) {
      throw new Error("Token manquant dans la réponse");
    }
    return data.token;
  } catch (err: any) {
    if (err instanceof TypeError && err.message === "Failed to fetch") {
      throw new Error(
        "Impossible de contacter l'API. Vérifiez que le serveur est bien démarré et que CORS est autorisé.",
      );
    }
    throw err;
  }
}
