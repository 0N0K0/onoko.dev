import { gql } from "@apollo/client";

// Requête pour récupérer la liste de tous les témoignages
export const TESTIMONIES_QUERY = gql`
  query Testimonies {
    testimonies {
      id
      name
      company
      content
      createdAt
      insert
    }
  }
`;
