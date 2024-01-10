import { useRouteError } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import WhiteNoise from '../assets/images/white-noise-colourful.gif';
import { Button } from "@mui/material";


export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <Box
        style={{
          backgroundImage: `url(${WhiteNoise})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Paper elevation={5} style={{ padding: 5 }}>
          <Typography variant="h1">Uh-Oh! Something went wrong!</Typography>
          <Typography justifyItems={"center"} variant="h4">...time to go <Button variant="outlined" size="large" href="/">home</Button>
          </Typography> 
        </Paper>
      </Box>
    </>
  );
}
