const { User, Game } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
// const { AuthenticationError } = require('apollo-server-express'); look into this dependncy...?

const resolvers = {

  Query: {
    searchGames: async (parent, { searchTerm }, context) => {
      try {
        const games = await Game.find({
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

    me: async (parent, args, context) => {
      if (context.user) {
        try {
          const user = await User.findById(context.user._id)
            .select('-password')
            .populate('savedGames');

          return user;
        } catch (error) {
          console.error(error);
          throw new Error('Error fetching user data');
        }
      }

      throw new AuthenticationError('Authentication required to fetch user data.');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error('Error creating user: ' + error.message);
      }
    },

    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user || !(await user.isCorrectPassword(password))) {
          throw AuthenticationError('Incorrect email or password');
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error('Error logging in: ' + error.message);
      }
    },

    saveGame: async (parent, { gameData }, context) => {
      if (context.user) {
        try {
          const user = await User.findById(context.user._id);
          if (!user) {
            throw new AuthenticationError('User not found.');
          }

          const game = await Game.create(gameData);
          user.savedGames.push(game._id);

          await user.save();

          return user;
        } catch (error) {
          console.error(error);
          throw new Error('Error saving game: ' + error.message);
        }
      }

      throw new AuthenticationError('Authentication required to save a game.');
    },
    removeGame: async (parent, { _id }, context) => {
      if (context.user) {
        try {
          const user = await User.findById(context.user._id);
          if (!user) {
            throw new AuthenticationError('User not found.');
          }

          // Remove the game's ObjectId from the savedGames array
          user.savedGames = user.savedGames.filter(savedGameId => savedGameId.toString() !== _id);

          // Save the updated user document
          await user.save();

          // Return the updated user
          return user;
        } catch (error) {
          console.error(error);
          throw new Error('Error removing game: ' + error.message);
        }
      }

      throw new AuthenticationError('Authentication required to remove a game.');
    },
  },
};

module.exports = resolvers;
