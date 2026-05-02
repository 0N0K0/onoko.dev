import { gql } from "@apollo/client";

// Requête pour récupérer la liste de tous les stacks (permet d'obtenir toutes les stacks disponibles)
export const STACKS_QUERY = gql`
  query Stacks {
    stacks {
      id
      label
      icon
      description
      versions
      skills
      category
    }
  }
`;
