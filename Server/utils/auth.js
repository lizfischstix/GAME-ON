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
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // Check the operation name to determine if authentication is required
    const operationName = req.body.operationName || req.query.operationName;
    
    if (operationName === 'saveGame' || operationName === 'getSavedGames') {
      // Authentication is required for saving or retrieving saved games
      if (!token) {
        throw module.exports.AuthenticationError;
      }

      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        throw module.exports.AuthenticationError;
      }
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
