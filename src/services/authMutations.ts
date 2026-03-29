import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      token
    }
  }
`;

export const VERIFY_TOKEN_MUTATION = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token)
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
    }
  }
`;
