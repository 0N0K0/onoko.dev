import { gql } from "@apollo/client";

// Requête pour récupérer la liste de tous les intervenants
export const COWORKERS_QUERY = gql`
  query Coworkers {
    coworkers {
      id
      name
      roles
    }
  }
`;
