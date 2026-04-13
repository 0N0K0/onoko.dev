import { gql } from "@apollo/client";

export const STACK_FIELDS = gql`
  fragment StackFields on Stack {
    id
    label
    icon
    description
    versions
    skills
    category
  }
`;

// Requête pour récupérer la liste de tous les stacks (permet d'obtenir toutes les stacks disponibles)
export const STACKS_QUERY = gql`
  query Stacks {
    stacks {
      ...StackFields
    }
  }

  ${STACK_FIELDS}
`;
