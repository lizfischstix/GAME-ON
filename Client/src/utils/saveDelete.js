const User = require('./models/User'); // Import your User model

export const getSavedGameIds = async (userId) => {
  try {
    const user = await User.findById(userId).populate('savedGames');
    return user.savedGames.map((game) => game._id);
  } catch (error) {
    console.error('Error fetching saved game IDs:', error);
    return [];
  }
};

export const saveGameIds = async (userId, gameIdArr) => {
  try {
    const user = await User.findById(userId);
    
    // Set savedGames to be an array of data that adheres to the gameSchema
    user.savedGames = gameIdArr.map((gameId) => ({ _id: gameId }));

    await user.save();
  } catch (error) {
    console.error('Error saving game IDs:', error);
  }
};

export const removeGameId = async (userId, gameId) => {
  try {
    const user = await User.findById(userId);
    
    // Remove the specific game ID from the savedGames array
    user.savedGames = user.savedGames.filter((game) => game._id.toString() !== gameId);

    await user.save();
  } catch (error) {
    console.error('Error removing game ID:', error);
  }
};
