import { gql } from "@apollo/client";

// Mutations GraphQL pour l'authentification (connexion, vérification de token, rafraîchissement de token)
export const LOGIN_MUTATION = gql`
  mutation Login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      token
    }
  }
`;

// Mutation pour vérifier la validité d'un token d'authentification (généralement utilisé pour vérifier si l'utilisateur est toujours connecté)
export const VERIFY_TOKEN_MUTATION = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      login
    }
  }
`;

// Mutation pour rafraîchir un token d'authentification expiré en utilisant un token de rafraîchissement (généralement obtenu lors de la connexion)
export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
    }
  }
`;
