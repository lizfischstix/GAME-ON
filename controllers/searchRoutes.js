const router = require('express').Router();
const { Games } = require('../models');
const { Sequelize, DataTypes, Op } = require('sequelize');

// Main render for gamesearch page - get all games in 3 batches based on params id - root/gamesearch/:id
router.get('/:id', async (req, res) => {
  try {

    if(req.query.game){
      console.log("hello query");
      let gameName = req.query.game;

      const searchedGame = await Games.findOne({
        where:{
          title: gameName
        }
      });
      console.log(searchedGame);
      const game = searchedGame.get({plain:true});
      res.render('gamesearch', {
        game,
        usingArray: false,
        logged_in: req.session.logged_in
      });

    } else {

 
    const gameData = await Games.findAll({
      attributes: [
        'title',
        'short_description',
        'thumbnail',
        'game_url',
        'genre',
        'platform',
        'developer',
        [Sequelize.literal('(SELECT AVG(stars) FROM Reviews WHERE Reviews.game_id = Games.id)'), 'average_stars'],
      ],
    });

    const games = gameData.map((game) => game.get({ plain: true }));

    const oneThruFifty = games.slice(0, 50);
    const fiftyOneThruHundred = games.slice(50, 100);
    const hundredOneThruEnd = games.slice(100, 153);
    const arrayId = req.params.id;

    let chosenArray;
    if (arrayId == 1) {
      chosenArray = oneThruFifty;
    } else if (arrayId == 2) {
      chosenArray = fiftyOneThruHundred;
    } else {
      chosenArray = hundredOneThruEnd;
    };

    res.render('gamesearch', {
      chosenArray,
      usingArray: true,
      logged_in: req.session.logged_in
    });
  }
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/title', async (req, res) => {

//   // Retrieve the data from the query parameters
//   const searchResults = JSON.parse(decodeURIComponent(req.query.data));

//   // Render the appropriate Handlebars template with the data
//   res.render('title-search-results', { searchResults });
// });


module.exports = router;