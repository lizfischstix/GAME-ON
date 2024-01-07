import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedGames {
        id
        title
        thumbnail
        short_description
        game_url
        genre
        platform
      }
    }
  }
`;

export const GAME_SEARCH = gql`
  query GameSearch($searchTerm: String!) {
    gameSearch(searchTerm: $searchTerm) {
      _id
      title
      thumbnail
      shortDescription
      gameUrl
      genre
      platform
    }
  }
`;

export const ALL_GAMES = gql`
  query allGames {
    allGames {
      _id
      title
      thumbnail
      shortDescription
      gameUrl
      genre
      platform
    }
  }
`;
