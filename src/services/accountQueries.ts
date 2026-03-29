import { gql } from "@apollo/client";

export const ACCOUNT_QUERY = gql`
  query Account {
    account {
      login
      email
    }
  }
`;
