const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const savedSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  savedGames: [savedSchema],
});

// Define a pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const User = model('User', userSchema);

module.exports = User;
