import { gql } from "@apollo/client";

// Requête GraphQL pour récupérer les informations des paramètres
export const SETTINGS_QUERY = gql`
  query Settings {
    settings {
      maintenance
    }
  }
`;
