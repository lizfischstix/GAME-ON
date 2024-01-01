const { MongoClient } = require('mongodb');
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

      throw AuthenticationError;
    },
  },
  searchGame: async (parent, { query }, context) => {
    try {
      // Connect to the MongoDB database
      const client = new MongoClient(context.dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db();

      // Use a regular expression for case-insensitive and partial matching
      const regexQuery = new RegExp(query, 'i');

      // Use the $or operator to search in both title and genre fields
      const searchResult = await db.collection('games').find({
        $or: [
          { title: { $regex: regexQuery } },
          { genre: { $regex: regexQuery } },
          { platform: { $regex: regexQuery } },
          { developer: { $regex: regexQuery } },
        ],
      }).toArray();

      // Close the database connection
      await client.close();

      return searchResult;
    } catch (error) {
      console.error('Error searching for games:', error);
      throw new Error('Error searching for games');
    }
  },
}

Mutation: {
  addUser: async (parent, args) => {
    const user = await User.create(args);
    const token = signToken(user);

    return { token, user };
  }
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw AuthenticationError;
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw AuthenticationError;
    }

    const token = signToken(user);
    return { token, user };
  }
  saveGame: async (parent, { gameData }, context) => {
    if (context.user) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { savedGames: gameData } },
        { new: true }
      );

      return updatedUser;
    }

    throw AuthenticationError;
  }
  removeGame: async (parent, { _id }, context) => {
    if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedGames: { _id } } },
        { new: true }
      );

      return updatedUser;
    }

    throw AuthenticationError;
  }
  
};

module.exports = resolvers;
