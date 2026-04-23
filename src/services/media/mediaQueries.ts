import { gql } from "@apollo/client";

// Requête pour récupérer la liste de tous les médias
export const MEDIAS_QUERY = gql`
  query Medias {
    medias {
      id
      label
      path
      type
      category
      focus
    }
  }
`;
