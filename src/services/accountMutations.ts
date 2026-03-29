import { gql } from "@apollo/client";

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

export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation RequestResetPassword($email: String!) {
    requestResetPassword(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;
