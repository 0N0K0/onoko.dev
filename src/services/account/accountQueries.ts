import { gql } from "@apollo/client";

// Requête GraphQL pour récupérer les informations du compte utilisateur (login, email)
export const ACCOUNT_QUERY = gql`
  query Account {
    account {
      login
      email
    }
  }
`;
