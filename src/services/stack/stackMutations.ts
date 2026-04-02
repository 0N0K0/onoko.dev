import { gql } from "@apollo/client";
import { STACK_FIELDS } from "./stackQueries";

export const CREATE_STACK_MUTATION = gql`
  mutation CreateStack(
    $label: String!
    $iconFile: Upload!
    $description: String
    $versions: [String!]
    $category: ID
  ) {
    createStack(
      label: $label
      iconFile: $iconFile
      description: $description
      versions: $versions
      category: $category
    ) {
      ...StackFields
    }
  }

  ${STACK_FIELDS}
`;

export const UPDATE_STACK_MUTATION = gql`
  mutation UpdateStack(
    $id: ID!
    $label: String
    $iconFile: Upload
    $description: String
    $versions: [String!]
    $category: ID
  ) {
    updateStack(
      id: $id
      label: $label
      iconFile: $iconFile
      description: $description
      versions: $versions
      category: $category
    ) {
      ...StackFields
    }
  }

  ${STACK_FIELDS}
`;

export const DELETE_STACK_MUTATION = gql`
  mutation DeleteStack($id: ID!) {
    deleteStack(id: $id)
  }
`;
