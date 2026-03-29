import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

/**
 * Configure et exporte une instance d'Apollo Client pour interagir avec le backend GraphQL.
 * Utilise un cache en mémoire pour stocker les données récupérées et un lien HTTP pour communiquer avec le serveur GraphQL à l'URL spécifiée.
 */
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/",
  }),
});

export default apolloClient;
