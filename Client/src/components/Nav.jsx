import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Modal,
  Tab,
  Paper,
  Tabs,
  TabPanel,
} from '@mui/material';
import SignUp from './Signup.jsx';
import LogIn from './Login.jsx';

import Auth from '../utils/auth';

const Nav = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Container>
          <Toolbar>
            <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
              Game On!
            </Typography>
            <Button color="inherit" component={Link} to="/GameSearch">
              Search For Games
            </Button>
            <Button color="inherit" component={Link} to="/About">
              About Game On!
            </Button>
            {Auth.loggedIn() ? (
              <>
                <Button color="inherit" component={Link} to="/saved">
                  See Your Games
                </Button>
                <Button color="inherit" onClick={Auth.logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => setShowModal(true)}>
                Login/Sign Up
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* set modal data up */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Paper>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" value="login" />
            <Tab label="Sign Up" value="signup" />
          </Tabs>
        </Paper>

        <TabPanel value={activeTab} index="login">
          <LogIn handleModalClose={() => setShowModal(false)} />
        </TabPanel>
        <TabPanel value={activeTab} index="signup">
          <SignUp handleModalClose={() => setShowModal(false)} />
        </TabPanel>
      </Modal>
    </>
  );
};

export default Nav;
