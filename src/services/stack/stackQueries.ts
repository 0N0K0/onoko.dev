import { gql } from "@apollo/client";

export const STACK_FIELDS = gql`
  fragment StackFields on Stack {
    id
    label
    icon {
      id
      label
      path
      type
    }
    description
    versions
    skills
    category {
      id
      label
    }
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

export const STACKS_BY_CATEGORY_QUERY = gql`
  query StacksByCategory($category: String!) {
    stacksByCategory(category: $category) {
      ...StackFields
    }
  }

  ${STACK_FIELDS}
`;

// Requête pour récupérer une stack spécifique en fonction d'une clé (id ou label) et d'une valeur (valeur de l'id ou du label)
export const STACK_QUERY = gql`
  query Stack($key: String!, $value: String!) {
    stack(key: $key, value: $value) {
      ...StackFields
    }
  }

  ${STACK_FIELDS}
`;
