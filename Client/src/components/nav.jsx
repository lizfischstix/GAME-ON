import * as React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { Tooltip } from '@mui/material';


import Auth from "../utils/auth"

export default function Nav({ isAuthenticated }) {
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
      indicatorColor= {{color: `#550381`}}
    >
      <Link to="/">
        <Tooltip title="Home" placement="bottom" arrow>
          <Tab
            icon={
              <HomeRoundedIcon sx={{ color: `#550381`, fontSize: 30 }} />
            }
            aria-label="Home"
          />
        </Tooltip>
      </Link>

      {Auth.loggedIn() ? (
        <>
          <Link to="/overview">
            <Tooltip title="Dashboard" placement="bottom" arrow>
              {" "}
              <Tab
                icon={
                  <SportsEsportsIcon sx={{ color: `#550381`, fontSize: 30 }} />
                }
                aria-label="Overview"
              />
            </Tooltip>
          </Link>

          <Link to="/transaction">
            <Tooltip title="Transaction List" placement="bottom" arrow>
              <Tab
                icon={
                  <AssignmentRoundedIcon
                    sx={{ color: `#550381`, fontSize: 30 }}
                  />
                }
                aria-label="Transactions List"
              />
            </Tooltip>
          </Link>

          <Link to="/graphpage">
            <Tooltip title="Spending Graphs" placement="bottom" arrow>
              <Tab
                icon={
                  <AutoGraphRoundedIcon
                    sx={{ color: `#550381`, fontSize: 30 }}
                  />
                }
                aria-label="Transactions Graphs"
              />
            </Tooltip>
          </Link>

          <Link to="/home">
            <Tooltip title="Log Out" placement="bottom" arrow>
              <Tab
                icon={
                  <LoginRoundedIcon sx={{ color: `#550381`, fontSize: 30 }} />
                }
                aria-label="Home"
                onClick={logout}
              />
            </Tooltip>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <Tooltip title="Log In" placement="bottom" arrow>
              {" "}
              <Tab
                icon={
                  <LoginRoundedIcon sx={{ color: `#550381`, fontSize: 30 }} />
                }
                aria-label="Log In"
              />
            </Tooltip>
          </Link>
         
          <Link to="/signup">
            <Tooltip title="Sign Up" placement="bottom" arrow>
              {" "}
              <Tab
                icon={
                  <AddBoxRoundedIcon sx={{ color: `#550381`, fontSize: 30 }} />
                }
                aria-label="Sign Up"
              />
            </Tooltip>
          </Link>

          <Link to='/about'>
            <Tooltip title="About Us" placement='bottom' arrow>
              {" "}
              <Tab
                icon={
                  <WavingHandIcon sx={{ color: `#550381`, fontSize: 30 }} />
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
