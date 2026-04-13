import { gql } from "@apollo/client";
import { ROLE_FIELDS } from "./roleQueries";

// Mutations GraphQL pour la gestion des rôles (création, mise à jour, suppression)
export const CREATE_ROLE_MUTATION = gql`
  mutation CreateRole($input: { label: String! }) {
    createRole(input: $input)
  }

  ${ROLE_FIELDS}
`;

// Mutation pour mettre à jour un rôle existant en fonction de son ID (permet de modifier le label d'un rôle)
export const UPDATE_ROLE_MUTATION = gql`
  mutation UpdateRole($id: ID!, $input: { label: String }) {
    updateRole(id: $id, input: $input)
  }

  ${ROLE_FIELDS}
`;

// Mutation pour supprimer un rôle en fonction de son ID (permet de supprimer un rôle existant)
export const DELETE_ROLE_MUTATION = gql`
  mutation DeleteRole($id: ID!) {
    deleteRole(id: $id)
  }
`;
