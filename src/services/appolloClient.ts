import { createHttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

/**
 * Configure et exporte une instance d'Apollo Client pour interagir avec le backend GraphQL.
 * Utilise un cache en mémoire pour stocker les données récupérées et un lien HTTP pour communiquer avec le serveur GraphQL à l'URL spécifiée.
 */

// Lien HTTP vers ton endpoint GraphQL
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// Middleware pour ajouter le JWT à chaque requête
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  console.log("Apollo Client - Token:", token); // Debug: Affiche le token récupéré
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
