import { gql } from "@apollo/client";

// Requête pour récupérer la liste de toutes les catégories (permet d'obtenir toutes les catégories de projets et technologies disponibles)
export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      label
      entity
      description
      parent
      depth
    }
  }
`;
