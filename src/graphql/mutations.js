import {gql} from "@apollo/client";
import {USER_BASE_FIELDS} from "./fragments";

export const AUTHENTICATE = gql`
mutation Authenticate($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`

export const CREATE_REVIEW = gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    createdAt
    id
    rating
    repositoryId
    text
    userId
    user {
      ...userBaseFields
    }
  }
}
${USER_BASE_FIELDS}
`