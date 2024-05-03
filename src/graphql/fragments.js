import { gql } from '@apollo/client';

export const REPOSITORY_BASE_FIELDS = gql`
  fragment repositoryBaseFields on Repository {
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
`;

export const USER_BASE_FIELDS = gql`
  fragment userBaseFields on User {
    id
    username
    createdAt
  }
`;

export const REVIEW_BASE_FIELDS = gql`
  fragment reviewBaseFields on Review {
    createdAt
    id
    rating
    text
  }
`