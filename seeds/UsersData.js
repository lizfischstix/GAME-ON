const { Users } = require('../models');

const usersdata = [
    {
        "id": 1,
        "username": "Corey",
        "email": "cvladesov@gmail.com",
        "password": "password12345"
      },
      {
        "id": 2,
        "username": "Beth",
        "email": "bdeutmeyer@gmail.com",
        "password": "password12345"
      },
      {
        "id": 3,
        "username": "Liz",
        "email": "lfischsticks@gmail.com",
        "password": "password12345"
      },
      {
        "id": 4,
        "username": "Taylor",
        "email": "tcannon@gmail.com",
        "password": "password12345"
      },
      {
        "id": 5,
        "username": "Poornima",
        "email": "bestteacher@gmail.com",
        "password": "password12345"
      },
      {
        "id": 6,
        "username": "Sam",
        "email": "ogTA@gmail.com",
        "password": "password12345"
      },
      {
        "id": 7,
        "username": "Austin",
        "email": "newguyTA@gmail.com",
        "password": "password12345"
      }
];

const seedUsers = () => Users.bulkCreate(usersdata);

module.exports = seedUsers;
