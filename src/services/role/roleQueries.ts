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

// Requête pour récupérer un rôle spécifique en fonction d'une clé (id ou label) et d'une valeur (valeur de l'id ou du label)
export const ROLE_QUERY = gql`
  query Role($key: String!, $value: String!) {
    role(key: $key, value: $value) {
      ...RoleFields
    }
  }

  ${ROLE_FIELDS}
`;
