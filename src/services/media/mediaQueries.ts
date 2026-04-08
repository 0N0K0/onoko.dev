import { gql } from "@apollo/client";

// Fragment GraphQL pour les champs d'un média
export const MEDIA_FIELDS = gql`
  fragment MediaFields on Media {
    id
    label
    path
    type
    category {
      id
      label
    }
  }
`;

// Requête pour récupérer la liste de tous les médias
export const MEDIAS_QUERY = gql`
  query Medias {
    medias {
      ...MediaFields
    }
  }

  ${MEDIA_FIELDS}
`;

// Requête pour récupérer un média spécifique en fonction de son ID
export const MEDIA_QUERY = gql`
  query Media($id: ID!) {
    media(id: $id) {
      ...MediaFields
    }
  }

  ${MEDIA_FIELDS}
`;
