const typeDefs = `
  type User {
    _id: ID!
    email: String!
    password: String!  
    firstName: String!
    lastName: String!
  }
  
  type Game {
    id: ID!
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
    getGameByTitle(id: ID!): Game
    getAllGames: [Game]
  }

  `;

  module.exports = typeDefs;