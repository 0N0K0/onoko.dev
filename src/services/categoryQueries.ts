import { gql } from "@apollo/client";

const CATEGORY_FIELDS = gql`
  fragment CategoryFields on Category {
    id
    label
    entity
    description
    parent
    depth
  }
`;

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      ...CategoryFields
    }
  }

  ${CATEGORY_FIELDS}
`;

export const CATEGORY_QUERY = gql`
  query Category($key: String!, $value: String!, $entity: String) {
    category(key: $key, value: $value, entity: $entity) {
      ...CategoryFields
    }
  }

  ${CATEGORY_FIELDS}
`;
