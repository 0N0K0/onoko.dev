import { gql } from "@apollo/client";
import { MEDIA_FIELDS } from "./mediaQueries";

// Mutation pour créer un nouveau média
export const ADD_MEDIA_MUTATION = gql`
  mutation AddMedia($input: { file: Upload! }) {
    addMedia(input: $input)
  }

  ${MEDIA_FIELDS}
`;

// Mutation pour mettre à jour un média existant en fonction de son ID
export const UPDATE_MEDIA_MUTATION = gql`
  mutation UpdateMedia($id: ID!, $input: { label: String, category: ID }) {
    updateMedia(id: $id, input: $input)
  }

  ${MEDIA_FIELDS}
`;

// Mutation pour supprimer un média en fonction de son ID
export const REMOVE_MEDIA_MUTATION = gql`
  mutation RemoveMedia($id: ID!) {
    removeMedia(id: $id)
  }
`;
