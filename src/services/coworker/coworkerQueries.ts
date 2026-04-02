import { gql } from "@apollo/client";

// Requêtes GraphQL pour la gestion des rôles (récupération de la liste des rôles, récupération d'un rôle spécifique)
export const COWORKER_FIELDS = gql`
  fragment CoworkerFields on Coworker {
    id
    name
    roles {
      id
      label
    }
  }
`;

// Requête pour récupérer la liste de tous les rôles (permet d'obtenir tous les rôles disponibles)
export const COWORKERS_QUERY = gql`
  query Coworkers {
    coworkers {
      ...CoworkerFields
    }
  }

  ${COWORKER_FIELDS}
`;

// Requête pour récupérer un rôle spécifique en fonction d'une clé (id ou label) et d'une valeur (valeur de l'id ou du label)
export const COWORKER_QUERY = gql`
  query Coworker($key: String!, $value: String!) {
    coworker(key: $key, value: $value) {
      ...CoworkerFields
    }
  }

  ${COWORKER_FIELDS}
`;
