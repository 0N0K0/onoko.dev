import { gql } from "@apollo/client";

// Requête pour récupérer la liste de tous les rôles (permet d'obtenir tous les rôles disponibles)
export const ROLES_QUERY = gql`
  query Roles {
    roles {
      id
      label
    }
  }
`;
