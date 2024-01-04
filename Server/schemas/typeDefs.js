const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
    gameCount: Int
    savedGames: [Game]
  }

  type Game {
    id: ID!
    title: String !
    thumbnail: String 
    short_description: String
    game_url: String !
    genre: String
    platform: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input GameInput {
    id: ID!
    title: String !
    thumbnail: String 
    short_description: String
    game_url: String !
    genre: String
    platform: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(gameData: GameInput!): User
    removeGame(id: ID!): User
  }
`;

module.exports = typeDefs;
