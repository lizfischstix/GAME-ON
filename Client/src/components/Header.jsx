import { Box, Typography } from '@mui/material';
import React from 'react';

const Header = () => {
    return (
        <>
            <Box
                style={{
                    backgroundSize:'cover',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant='h1' fontFamily={'preahvihear, sans-serif'}>Game On!</Typography>
            </Box>
        </>
    )
}
export default Header;