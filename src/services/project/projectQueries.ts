import { gql } from "@apollo/client";

export const PROJECT_FIELDS = gql`
  fragment ProjectFields on Project {
    id
    label
    thumbnail {
      id
      label
      path
      type
    }
    categories {
      id
      label
    }
    website {
      url
      label
    }
    mockup {
      url
      label
      images {
        id
        label
        path
        type
      }
    }
    client {
      label
      logo {
        id
        label
        path
        type
      }
    }
    manager {
      name
      email
    }
    startDate
    endDate
    intro {
      context
      objective
      client
    }
    presentation {
      description
      issue
      audience
    }
    need {
      features
      functionalConstraints
      technicalConstraints
    }
    organization {
      workload
      anticipation
      methodology
      evolution
      validation
    }
    roles {
      id
      label
    }
    coworkers {
      id
      name
      roles {
        id
        label
      }
    }
    stacks {
      id
      label
      icon {
        id
        label
        path
        type
      }
      version
      category {
        id
        label
      }
      section
    }
    kpis {
      issues
      points
      commits
      pullRequests
    }
    feedback {
      general
      client
    }
  }
`;

export const PROJECTS_QUERY = gql`
  query Projects {
    projects {
      ...ProjectFields
    }
  }

  ${PROJECT_FIELDS}
`;

export const PROJECT_QUERY = gql`
  query Project($key: String!, $value: String!) {
    project(key: $key, value: $value) {
      ...ProjectFields
    }
  }

  ${PROJECT_FIELDS}
`;
