// Function to get saved games from localStorage
export const getSavedGames = () => {
  const savedGames = localStorage.getItem('saved_games')
    ? JSON.parse(localStorage.getItem('saved_games'))
    : [];

  return savedGames;
};

// Function to save games to localStorage
export const saveGames = (gameArr) => {
  if (gameArr.length) {
    localStorage.setItem('saved_games', JSON.stringify(gameArr));
  } else {
    localStorage.removeItem('saved_games');
  }
};

// Function to remove a specific game from localStorage
export const removeGameId = (game) => {
  const savedGames = localStorage.getItem('saved_games')
    ? JSON.parse(localStorage.getItem('saved_games'))
    : null;

  if (!savedGames) {
    return false;
  }

  // Corrected variable name 'Game' to 'game'
  const updatedSavedGames = savedGames.filter((savedGame) => savedGame !== game);
  localStorage.setItem('saved_games', JSON.stringify(updatedSavedGames));

  return true;
};
