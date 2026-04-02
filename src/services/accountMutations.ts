import { gql } from "@apollo/client";

// Mutations GraphQL pour la gestion du compte utilisateur (mise à jour des informations, réinitialisation du mot de passe, etc.)
export const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UpdateAccount(
    $login: String
    $email: String
    $oldPassword: String!
    $newPassword: String
  ) {
    updateAccount(
      login: $login
      email: $email
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      login
      email
    }
  }
`;

// Mutation pour demander une réinitialisation de mot de passe (envoi d'un email avec un lien de réinitialisation)
export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation RequestResetPassword($email: String!) {
    requestResetPassword(email: $email)
  }
`;

// Mutation pour réinitialiser le mot de passe en utilisant un token de réinitialisation (généralement obtenu via le lien envoyé par email)
export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;
