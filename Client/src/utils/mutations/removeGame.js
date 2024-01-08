import { gql } from "@apollo/client";

export const REMOVE_GAME = gql`
mutation RemoveGame($_id: ID!) {
    removeGame(_id: $_id) {
      _id
      username
      email
      gameCount
      savedGames {
        title
        thumbnail
        shortDescription
        gameUrl
        genre
        platform
      }
    }
  }
  
`;