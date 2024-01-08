import { gql } from "@apollo/client";

export const GAME_SEARCH = gql`
query SearchGames($searchTerm: String!) {
    searchGames(searchTerm: $searchTerm) {
      title
      platform
      genre
      thumbnail
      shortDescription
      gameUrl
    }
  }
`;