import { gql } from "@apollo/client";

// Mutations GraphQL pour la gestion des paramètres
export const UPDATE_SETTINGS_MUTATION = gql`
  mutation UpdateSettings($maintenance: Boolean!) {
    updateSettings(maintenance: $maintenance) {
      maintenance
    }
  }
`;
