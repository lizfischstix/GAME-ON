import React from 'react';
import { Button, Link as RouterLink } from '@mui/material';

const PlayNow = ({ game }) => {
  return (
    <Button
      variant="contained"
      color="primary"
    //   component={RouterLink}
      to={game.gameUrl}
      target="_blank" // Open link in a new tab/window
    >
      Play Now!
    </Button>
  );
};

export default PlayNow;
