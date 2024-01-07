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
    shortDescription: String
    gameUrl: String !
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
    shortDescription: String
    gameUrl: String !
    genre: String
    platform: String
  }

  type Query {
    me: User
    searchGames(searchTerm: String!): [Game]
    allGames: [String!]!
    allSaved: [String!]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(gameData: GameInput!): User
    removeGame(id: ID!): User
  }
`;

module.exports = typeDefs;
