const db = require("../config/connection");
const { Game, User }  = require('../models');
const cleanDB = require('./cleanDB');
const GamesData = require('./GamesData');
const UsersData = require('./UsersData.json')

db.once('open', async () => {
  try {
    await cleanDB('Game', 'games');
    await Game.create(GamesData);
    await cleanDB('User', 'users');
    await User.create(UsersData);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
