const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  text: {
    type: String,
  },
  stars: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'Stars must be an integer.',
    },
    min: 1,
    max: 5,
  },
});

const Review = model('Review', reviewSchema);

module.exports = Review;
