import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';
import { removeGameId } from '../utils/localStorage';

import Auth from '../utils/auth';

const SavedGames = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeGame, { error }] = useMutation(REMOVE_GAME);

  const userData = data?.me || {};

  // create function that accepts the game's mongo _id value as param and deletes the game from the database
  const handleDeletegame = async (id) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeGame({
        variables: { id },
      });

      // upon success, remove Game's id from localStorage
      removeGameId(id);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {userData.username}'s games!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedGames?.length
            ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'
            }:`
            : 'You have no saved games!'}
        </h2>
        <div>
          <Row>
            {userData.savedGames?.map((game) => {
              return (
                <Col md="4">
                  <Card key={game.id} border="dark">
                    {game.thumbnail ? (
                      <Card.Img
                        src={game.thumbnail}
                        alt={`The cover for ${game.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{game.title}</Card.Title>
                      <p className="small">Authors: {game.game_url}</p>
                      <Card.Text>{game.short_description}</Card.Text>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeletegame(game.id)}
                      >
                        Delete this Game!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default SavedGames;
