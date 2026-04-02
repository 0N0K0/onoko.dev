import { gql } from "@apollo/client";

// Mutations GraphQL pour la gestion des catégories de projets et technologies (création, mise à jour, suppression)
export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory(
    $label: String!
    $entity: String!
    $description: String
    $parent: ID
  ) {
    createCategory(
      label: $label
      entity: $entity
      description: $description
      parent: $parent
    ) {
      id
      label
      entity
      description
      parent
      depth
    }
  }
`;

// Mutation pour mettre à jour une catégorie existante en fonction de son ID (permet de modifier le label, l'entité, la description ou le parent d'une catégorie)
export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory(
    $id: ID!
    $label: String
    $entity: String
    $description: String
    $parent: ID
  ) {
    updateCategory(
      id: $id
      label: $label
      entity: $entity
      description: $description
      parent: $parent
    ) {
      id
      label
      entity
      description
      parent
      depth
    }
  }
`;

// Mutation pour supprimer une catégorie en fonction de son ID (permet de supprimer une catégorie existante)
export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
