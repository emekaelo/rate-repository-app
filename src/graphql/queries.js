import {gql} from "@apollo/client";
import {REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS} from "./fragments";

export const GET_REPOSITORIES = gql`
query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ...repositoryBaseFields
      }
    }
  }
}
${REPOSITORY_BASE_FIELDS}
`

export const ME = gql`
query {
  me {
    ...userBaseFields
  }
}
${USER_BASE_FIELDS}
`

export const GET_REPOSITORY = gql`
query Repository($repositoryId: ID!) {
  repository(id: $repositoryId) {
    ...repositoryBaseFields
    reviews {
      edges {
        node {
          user {
            ...userBaseFields
          }
          createdAt
          id
          rating
          text
        }
      }
    }
  }
}
${REPOSITORY_BASE_FIELDS}
${USER_BASE_FIELDS}
`