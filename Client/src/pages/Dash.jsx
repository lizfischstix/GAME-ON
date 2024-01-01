import * as React from 'react';
import {
  Container,
  Card,
  Button,
  Grid,
  Typography,
} from '@mui/material';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';
import { removeGameId } from '../utils/localStorage';

import Auth from '../utils/auth';

const SavedGames = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeGame, { error }] = useMutation(REMOVE_GAME);

  const userData = data?.me || {};

  const handleDeleteGame = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeGame({
        variables: { _id },
      });

      removeGameId(_id);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <Typography variant="h2">LOADING...</Typography>;
  }

  return (
    <>
      <div style={{ backgroundColor: '#343a40', color: 'white', padding: '5rem 0' }}>
        <Container>
          <Typography variant="h1">Viewing {userData.username}'s games!</Typography>
        </Container>
      </div>
      <Container>
        <Typography variant="h2" className='pt-5'>
          {userData.savedGames?.length
            ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'
            }:`
            : 'You have no saved games!'}
        </Typography>
        <Grid container spacing={2}>
          {userData.savedGames?.map((game) => (
            <Grid item xs={12} md={4} key={game._id}>
              <Card sx={{ border: 'dark' }}>
                {game.thumbnail ? (
                  <Card.Img
                    src={game.thumbnail}
                    alt={`The cover of ${game.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Content>
                  <Typography variant="h6">{game.title}</Typography>
                  <Typography variant="body2" className="small">Genre: {game.genre}</Typography>
                  <Typography variant="body1">{game.shortDescription}</Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteGame(game._id)}
                    sx={{ mt: 2 }}
                  >
                    Delete this Game!
                  </Button>
                </Card.Content>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default SavedGames;
