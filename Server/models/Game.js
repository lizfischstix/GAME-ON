const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedGames` array in User.js
const gameSchema = new Schema({

  
  id: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  short_description: {
    type: String,
  },
  game_url: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  platform: {
    type: String,
  }
})
module.exports= gameSchema;
