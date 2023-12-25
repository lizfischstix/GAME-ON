const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: String,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  gameUrl: {
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
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }],
});

const Game = model("Game", gameSchema);

module.exports = Game;
