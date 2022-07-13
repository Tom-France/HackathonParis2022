import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import bg_loader from '../images/loader-animation.gif'


import '../App.css';
import MapGame from '../components/MapGame';

function Start() {
    return (
        <div className="App" sx={{ height: '100', with: '100%' }}>

            <Box>
                <Typography variant='h5' sx={{ color: 'white',
                 pt: 10, backgroundImage:`url(${bg_loader})`, 
                 backgroundSize: '100px', 
                 backgroundRepeat: 'no-repeat',
                 backgroundPositionX: '50%',
                 backgroundPositionY: '150%',
                 pb:5
                   }}>MISSION EN COURS ...</Typography>
            </Box>

            <MapGame />

            <Outlet />
        </div>
    );
}

export default Start;
