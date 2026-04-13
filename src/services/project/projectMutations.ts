import { gql } from "@apollo/client";
import { PROJECT_FIELDS } from "./projectQueries";

// Mutation pour créer un nouveau projet en fournissant les différentes propriétés du projet
export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($input: ProjectInput!) {
    createProject(input: $input)
  }
  ${PROJECT_FIELDS}
`;

// Mutation pour mettre à jour un projet existant en fournissant son ID et les propriétés à mettre à jour
export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject($id: ID!, $input: ProjectInput!) {
    updateProject(id: $id, input: $input)
  }
  ${PROJECT_FIELDS}
`;

// Mutation pour supprimer un projet en fournissant son ID
export const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;
