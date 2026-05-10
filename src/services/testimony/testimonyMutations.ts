import { gql } from "@apollo/client";

// Mutations GraphQL pour la gestion des rôles (création, mise à jour, suppression)
export const CREATE_TESTIMONY_MUTATION = gql`
  mutation CreateTestimony($input: TestimonyInput!) {
    createTestimony(input: $input)
  }
`;

// Mutation pour mettre à jour un rôle existant en fonction de son ID (permet de modifier le label d'un rôle)
export const UPDATE_TESTIMONY_MUTATION = gql`
  mutation UpdateTestimony($id: ID!, $input: TestimonyInput!) {
    updateTestimony(id: $id, input: $input)
  }
`;

// Mutation pour supprimer un rôle en fonction de son ID (permet de supprimer un rôle existant)
export const DELETE_TESTIMONY_MUTATION = gql`
  mutation DeleteTestimony($id: ID!) {
    deleteTestimony(id: $id)
  }
`;
