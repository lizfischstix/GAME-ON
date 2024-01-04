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
  searchGames: async (parent, { searchTerm }, context) => {

    try {
      const games = await game.find({
        $or: [
          { title: { $regex: new RegExp(searchTerm, 'i') } },
          { genre: { $regex: new RegExp(searchTerm, 'i') } },
          { platform: { $regex: new RegExp(searchTerm, 'i') } },
        ],
      });
      return games;
    } catch (error) {
      console.error(error);
      throw new Error('Error searching for games');
    }
  },


  Mutation: {

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

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
    },
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
    },
    removeGame: async (parent, { id }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedGames: { id } } },
          { new: true }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
