import { gql } from "@apollo/client";
import { STACK_FIELDS } from "./stackQueries";

export const CREATE_STACK_MUTATION = gql`
  mutation CreateStack($input: StackInput!) {
    createStack(input: $input)
  }

  ${STACK_FIELDS}
`;

export const UPDATE_STACK_MUTATION = gql`
  mutation UpdateStack($id: ID!, $input: StackInput!) {
    updateStack(id: $id, input: $input)
  }

  ${STACK_FIELDS}
`;

export const DELETE_STACK_MUTATION = gql`
  mutation DeleteStack($id: ID!) {
    deleteStack(id: $id)
  }
`;
