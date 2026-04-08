import { gql } from "@apollo/client";

// Requêtes GraphQL pour la gestion des catégories de projets et technologies (récupération de la liste des catégories, récupération d'une catégorie spécifique)
export const CATEGORY_FIELDS = gql`
  fragment CategoryFields on Category {
    id
    label
    entity
    description
    parent
    depth
  }
`;

// Requête pour récupérer la liste de toutes les catégories (permet d'obtenir toutes les catégories de projets et technologies disponibles)
export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      ...CategoryFields
    }
  }

  ${CATEGORY_FIELDS}
`;

// Requête pour récupérer une catégorie spécifique en fonction d'une clé (id ou label) et d'une valeur (valeur de l'id ou du label), avec une option pour filtrer par entité (projet ou technologie)
export const CATEGORY_QUERY = gql`
  query Category($key: String!, $value: String!, $entity: String) {
    category(key: $key, value: $value, entity: $entity) {
      ...CategoryFields
    }
  }

  ${CATEGORY_FIELDS}
`;
