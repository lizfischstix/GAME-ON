import { gql } from "@apollo/client";

export const SAVE_GAME = gql`
mutation SaveGame($gameData: GameInput!) {
    saveGame(gameData: $gameData) {
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