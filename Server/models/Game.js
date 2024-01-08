const { Schema, model } = require('mongoose');

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
  },
  gameUrl: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  platform: {
    type: String,
  }
});

const Game = model('Game', gameSchema);

module.exports = Game;