const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    // Extract token from the Authorization header
    let token = req.headers.authorization;
    
    if (!token) {
      // Check other sources if the token is not in the headers
      token = req.body.token || req.query.token;
    }

    if (token) {
      // Extract the token from the "Bearer" scheme
      token = token.replace('Bearer ', '').trim();

      // Check the operation name to determine if authentication is required
      const operationName = req.body.operationName || req.query.operationName;

      if (operationName === 'saveGame' || operationName === 'getSavedGames') {
        // Authentication is required for saving or retrieving saved games
        try {
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          req.user = data;
        } catch (error) {
          if (error.name === 'TokenExpiredError') {
            throw new GraphQLError('Token has expired.', {
              extensions: {
                code: 'UNAUTHENTICATED',
              },
            });
          } else {
            throw new GraphQLError('Invalid token.', {
              extensions: {
                code: 'UNAUTHENTICATED',
              },
            });
          }
        }
      }
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
