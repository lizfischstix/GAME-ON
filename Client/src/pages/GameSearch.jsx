import * as React from 'react';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';
import { saveGames, getSavedGames } from '../utils/localStorage';
import Auth from '../utils/auth';
import {
  Container,
  Button,
  TextField,
  Card,
  Grid,
} from '@mui/material';
import PlayNow from '../components/PlayNowBtn.jsx';

const SearchGames = () => {
  const [searchedGames, setSearchedGames] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedGames, setSavedGames] = useState(getSavedGames());
  const Game = require('../../../Server/models/Game');
  const [saveGame, { error }] = useMutation(SAVE_GAME);

  useEffect(() => {
    return () => saveGames(savedGames);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
     
      const games = await Game.find({
        $or: [
          { title: { $regex: searchInput, $options: 'i' } }, // Case-insensitive title search
          { genre: { $regex: searchInput, $options: 'i' } }, // Case-insensitive genre search
         
        ],
      });

      // Transform the MongoDB results into the desired format
      const gameData = games.map((game) => ({
        title: game.title,
        thumbnail: game.thumbnail || 'No image to display',
        genre: game.genre,
        description: game.shortDescription,
        playNow: < PlayNow />
      }
      ));

      setSearchedGames(gameData);
      setSearchInput('');
    } catch (err) {
      console.error('Error searching MongoDB:', err.message);
    }
  };

  const handleSaveGame = async (_id) => {
    const gameToSave = searchedGames.find((game) => game._id === _id);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveGame({
        variables: { gameData: { ...gameToSave } },
      });

      setSavedGames([...savedGames, GameToSave._Id]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Games!</h1>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  variant="outlined"
                  size="large"
                  placeholder="Search for a game"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button type="submit" variant="contained" color="success" size="large">
                  Submit Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : 'Search for a game to begin'}
        </h2>
        <Grid container spacing={2}>
          {searchedGames.map((game) => (
            <Grid item md={4} key={game._id}>
              <Card sx={{ border: 'dark', mb: 3 }}>
                {game.thumbnail ? (
                  <Card.Img
                    src={game.thumbnail}
                    alt={`The cover for ${game.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Content>
                  <Card.Title>{game.title}</Card.Title>
                  <p className="small">Description: {game.shortDescription}</p>
                  <Card.Text>{game.gameURL}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedGameIds?.some((savedId) => savedId === game._id)}
                      className="btn-block btn-info"
                      onClick={() => handleSaveGame(game._id)}
                    >
                      {savedGameIds?.some((savedId) => savedId === game._id)
                        ? 'Game Already Saved!'
                        : 'Save This Game!'}
                    </Button>
                  )}
                </Card.Content>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default SearchGames;
