const { User, Review, Game } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError("User not authenticated");
        },  
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Invalid credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Invalid credentials");
            }

            const token = signToken(user);

            return { token, user };
        },

        saveGame: async (parent, { title, thumbnail, gameUrl }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedGames: { title, thumbnail, gameUrl } } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },

        deleteGame: async (parent, { gameId }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { game: { _id: gameId } } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    }
}