import {gql} from "@apollo/client";
import {REPOSITORY_BASE_FIELDS, REVIEW_BASE_FIELDS, USER_BASE_FIELDS} from "./fragments";

export const GET_REPOSITORIES = gql`
query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $first: Int) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first) {
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
query Me($includeReviews: Boolean = false) {
  me {
    ...userBaseFields
     reviews @include(if: $includeReviews) {
      edges {
        node {
          ...reviewBaseFields
          repository {
            id
            fullName
          }
        }
      }
    }
  }
}
${USER_BASE_FIELDS}
${REVIEW_BASE_FIELDS}
`

export const GET_REPOSITORY = gql`
query Repository($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    ...repositoryBaseFields
    reviews(first: $first, after: $after) {
      edges {
        node {
          user {
            ...userBaseFields
          }
          ...reviewBaseFields
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
}
${REPOSITORY_BASE_FIELDS}
${USER_BASE_FIELDS}
${REVIEW_BASE_FIELDS}
`