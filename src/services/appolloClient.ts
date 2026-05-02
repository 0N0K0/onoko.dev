import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { API_URL } from "../constants/apiConstants";

/**
 * Configure et exporte une instance d'Apollo Client pour interagir avec le backend GraphQL.
 * Utilise un cache en mémoire pour stocker les données récupérées et un lien HTTP pour communiquer avec le serveur GraphQL à l'URL spécifiée.
 */

// Lien HTTP vers ton endpoint GraphQL
const httpLink = new UploadHttpLink({
  uri: `${API_URL}/graphql`,
});

// Middleware pour ajouter le JWT à chaque requête
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
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
