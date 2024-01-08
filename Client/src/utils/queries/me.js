import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      password
      gameCount
      savedGames {
        title
        platform
        genre
        thumbnail
        shortDescription
        gameUrl
      }
    }
  }
`;