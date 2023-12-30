import React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Tooltip } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Auth from '../utils/auth';


const Nav = ({ isAuthenticated }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

   const logout = (event) => {
     event.preventDefault();
     Auth.logout();
   };

  return (
    <Tabs
      value={value}
      onChange={handleChange}

      orientation="horizontal"
      aria-label="icon tabs"
      // indicatorColor= {{color: green[900]}}
    >
      <Link to="/">
        <Tooltip title="Home" placement="bottom" arrow>
          <Tab
            icon={
              <HomeRoundedIcon/>
            }
            aria-label="Home"
          />
        </Tooltip>
      </Link>

      {Auth.loggedIn() ? (
        <>
          <Link to="/Dash">
            <Tooltip title="Dashboard" placement="bottom" arrow>
              {" "}
              <Tab
                icon={
                  <SportsEsportsRoundedIcon/>
                }
                aria-label="Dash"
              />
            </Tooltip>
          </Link>

          <Link to="/Home">
            <Tooltip title="Log Out" placement="bottom" arrow>
              <Tab
                icon={
                  <LogoutRoundedIcon />
                }
                aria-label="Home"
                onClick={logout}
              />
            </Tooltip>
          </Link>
        </>
      ) : (
        <>
          <Link to="/Login">
            <Tooltip title="Log In" placement="bottom" arrow>
              {" "}
              <Tab
                icon={
                  <LoginRoundedIcon/>
                }
                aria-label="Log In"
              />
            </Tooltip>
          </Link>
         
          <Link to="/Signup">
            <Tooltip title="Sign Up" placement="bottom" arrow>
              {" "}
              <Tab
                icon={
                  <AddBoxRoundedIcon/>
                }
                aria-label="Sign Up"
              />
            </Tooltip>
          </Link>

          <Link to='/About'>
            <Tooltip title="About Us" placement='bottom' arrow>
              {" "}
              <Tab
                icon={
                  <WavingHandIcon />
                }
                aria-label='About Us'
                />
            </Tooltip>
          </Link>
        </>
      )}
    </Tabs>
  );
}
export default Nav;