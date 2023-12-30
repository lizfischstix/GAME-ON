const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  gameURL: {
    type: String,
  },
  genre: {
    type: String,
  },
  platform: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
  },
});

module.exports = gameSchema;
