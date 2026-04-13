import { gql } from "@apollo/client";

export const CREATE_STACK_MUTATION = gql`
  mutation CreateStack($input: StackInput!) {
    createStack(input: $input)
  }
`;

export const UPDATE_STACK_MUTATION = gql`
  mutation UpdateStack($id: ID!, $input: StackInput!) {
    updateStack(id: $id, input: $input)
  }
`;

export const DELETE_STACK_MUTATION = gql`
  mutation DeleteStack($id: ID!) {
    deleteStack(id: $id)
  }
`;
