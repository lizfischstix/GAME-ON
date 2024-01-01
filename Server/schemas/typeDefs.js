const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String
  gameCount: Int
  savedGames: [Game]
}
  
  type Game {
    gameId: ID!
    title: String!
    thumbnail: String
    shortDescription: String!
    gameUrl: String
    genre: String
    platform: String!
    developer: String
  }
  
  type Auth {
    token: ID!
    user: User
  }
  input GameInput {
    gameId: ID!
    title: String!
    thumbnail: String
    shortDescription: String!
    gameUrl: String
    genre: String
    platform: String!
    developer: String
  }

  type Query {
    me: User
    searchGame(query: String!): [Game]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(gameData: GameInput!): User
    removeGame(gameId: ID!): User
  }
  `;

module.exports = typeDefs;