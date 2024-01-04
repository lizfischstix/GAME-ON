import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';
import { GAME_SEARCH } from '../utils/queries';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';
import Auth from '../utils/auth';

const SearchGames = () => {
  const [searchedGames, setSearchedGames] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  const { loading, error, data } = useQuery(GAME_SEARCH, {
    variables: { searchTerm: searchInput },
    skip: !searchInput,
  });

  const [saveGame] = useMutation(SAVE_GAME);

  useEffect(() => {
    if (data) {
      setSearchedGames(data.gameSearch);
    }
  }, [data]);

  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  }, [savedGameIds]); // Include savedGameIds in the dependency array

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }
    // Add logic to trigger the GraphQL query here if needed
  };

  const handleSaveGame = async (gameId) => {
    const gameToSave = searchedGames.find((game) => game.id === gameId); // Fix the variable name

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveGame({
        variables: { gameData: { ...gameToSave } },
      });
      console.log(savedGameIds);
      setSavedGameIds([...savedGameIds, gameToSave.id]); // Fix the property name
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
       <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Games!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a game"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : 'Search for a game to begin'}
        </h2>
        <Row>
          {searchedGames.map((game) => {
            return (
              <Col md="4" key={game.gameId}>
                <Card border="dark" className='mb-3'>
                  {game.thumbnail ? (
                    <Card.Img
                      src={game.thumbnail}
                      alt={`The cover for ${game.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{game.title}</Card.Title>
                    <p className="small">{game.genre}</p>
                    <Card.Text>{game.short_description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedGameIds?.some(
                          (savedId) => savedId === game.gameId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveGame(game.gameId)}
                      >
                        {savedGameIds?.some((savedId) => savedId === game.gameId)
                          ? 'Game Already Saved!'
                          : 'Save This Game!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchGames;
