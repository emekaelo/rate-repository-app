import {gql} from "@apollo/client";

export const GET_REPOSITORIES = gql`
query {
  repositories {
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
        id
        ownerName
        name
        createdAt
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        watchersCount
        forksCount
        openIssuesCount
        url
        ownerAvatarUrl
        description
        language
        userHasReviewed
      }
    }
  }
}
`

export const ME = gql`
query {
  me {
    id
    username
  }
}
`

export const GET_REPOSITORY = gql`
query Repository($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    ownerName
    name
    createdAt
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    watchersCount
    forksCount
    openIssuesCount
    url
    ownerAvatarUrl
    description
    language
    reviews {
      edges {
        node {
          user {
            id
            username
            createdAt
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
`