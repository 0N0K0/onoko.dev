import { gql } from "@apollo/client";

export const PROJECT_FIELDS = gql`
  fragment ProjectFields on Project {
    id
    label
    thumbnailUrl
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
      imagesUrls
    }
    client {
      label
      logoUrl
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
      iconUrl
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
