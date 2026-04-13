import { gql } from "@apollo/client";
import { COWORKER_FIELDS } from "./coworkerQueries";

// Mutation pour créer un nouvel intervenant en fournissant son nom et une liste d'IDs de rôles associés
export const CREATE_COWORKER_MUTATION = gql`
  mutation CreateCoworker($input: { name: String!, roles: [ID!] }) {
    createCoworker(input: $input)
  }

  ${COWORKER_FIELDS}
`;

// Mutation pour mettre à jour un intervenant existant en fonction de son ID
export const UPDATE_COWORKER_MUTATION = gql`
  mutation UpdateCoworker($id: ID!, $input: { name: String, roles: [ID!] }) {
    updateCoworker(id: $id, input: $input)
  }

  ${COWORKER_FIELDS}
`;

// Mutation pour supprimer un intervenant en fonction de son ID
export const DELETE_COWORKER_MUTATION = gql`
  mutation DeleteCoworker($id: ID!) {
    deleteCoworker(id: $id)
  }
`;
