import { gql } from "@apollo/client";

export const PROJECT_FIELDS = gql`
  fragment ProjectFields on Project {
    id
    label
    thumbnail
    categories
    website {
      url
      label
    }
    mockup {
      url
      label
      images
    }
    client {
      label
      logo
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
    roles
    coworkers {
      id
      roles
    }
    stacks {
      id
      version
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
