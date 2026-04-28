import { gql } from "@apollo/client";

export const PROJECTS_QUERY = gql`
  query Projects {
    projects {
      id
      slug
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
        images {
          id
          position
        }
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
      intro
      presentation {
        context
        client
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
  }
`;
