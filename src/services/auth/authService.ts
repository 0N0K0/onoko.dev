import apolloClient from "../appolloClient";
import { LOGIN_MUTATION } from "./authMutations";

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
    const { data } = await apolloClient.mutate<{ login: { token: string } }>({
      mutation: LOGIN_MUTATION,
      variables: { login, password },
    });
    if (!data?.login?.token) {
      throw new Error("Token manquant dans la réponse GraphQL");
    }
    return data.login.token;
  } catch (err: any) {
    throw new Error(err.message || "Erreur inconnue lors du login GraphQL");
  }
}
