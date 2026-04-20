import { gql } from "@apollo/client";

// Mutations GraphQL pour la gestion des catégories de projets et technologies (création, mise à jour, suppression)
export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input)
  }
`;

// Mutation pour mettre à jour une catégorie existante en fonction de son ID (permet de modifier le label, l'entité, la description ou le parent d'une catégorie)
export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input)
  }
`;

// Mutation pour supprimer une catégorie en fonction de son ID (permet de supprimer une catégorie existante)
export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
