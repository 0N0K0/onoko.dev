import { gql } from "@apollo/client";

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory(
    $label: String!
    $entity: String!
    $description: String
    $parent: ID
  ) {
    createCategory(
      label: $label
      entity: $entity
      description: $description
      parent: $parent
    ) {
      id
      label
      entity
      description
      parent
      depth
    }
  }
`;

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory(
    $id: ID!
    $label: String
    $entity: String
    $description: String
    $parent: ID
  ) {
    updateCategory(
      id: $id
      label: $label
      entity: $entity
      description: $description
      parent: $parent
    ) {
      id
      label
      entity
      description
      parent
      depth
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
