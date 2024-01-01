import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      username  // Corrected field name
      savedGames {
        title
        thumbnail
        shortDescription
        gameUrl
        genre
        platform
        developer
      }
    }
  }
`;
