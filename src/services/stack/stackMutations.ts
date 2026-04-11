import { gql } from "@apollo/client";
import { STACK_FIELDS } from "./stackQueries";

export const CREATE_STACK_MUTATION = gql`
  mutation CreateStack(
    $label: String!
    $icon: ID!
    $description: String
    $versions: [String!]
    $skills: [String!]
    $category: ID
  ) {
    createStack(
      label: $label
      icon: $icon
      description: $description
      versions: $versions
      skills: $skills
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
    $icon: ID
    $description: String
    $versions: [String!]
    $skills: [String!]
    $category: ID
  ) {
    updateStack(
      id: $id
      label: $label
      icon: $icon
      description: $description
      versions: $versions
      skills: $skills
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
