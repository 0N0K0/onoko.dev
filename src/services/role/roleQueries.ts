import { gql } from "@apollo/client";

// Requêtes GraphQL pour la gestion des rôles (récupération de la liste des rôles, récupération d'un rôle spécifique)
export const ROLE_FIELDS = gql`
  fragment RoleFields on Role {
    id
    label
  }
`;

// Requête pour récupérer la liste de tous les rôles (permet d'obtenir tous les rôles disponibles)
export const ROLES_QUERY = gql`
  query Roles {
    roles {
      ...RoleFields
    }
  }

  ${ROLE_FIELDS}
`;
