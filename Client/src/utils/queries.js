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
{
  gameSearch {
    id
    title
    thumbnail
    short_description
    game_url
    genre
    platform
  }
}
`
