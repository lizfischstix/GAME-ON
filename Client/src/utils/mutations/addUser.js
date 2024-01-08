import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $password: String!
    $username: String!
  ) {
    addUser(
      email: $email
      password: $password
      username: $username
    ) {
      token
      user {
        _id
        email
        username
        password
      }
    }
  }
`;