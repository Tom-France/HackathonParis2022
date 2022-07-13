import { NavLink, Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { ReactComponent as Logo } from '../images/logo-grande-taille.svg'
import { ReactComponent as Input } from '../images/input-id.svg'
import { ReactComponent as Button } from '../images/bouton-go.svg'
import '../App.css';

function Explen() {
    return (
        <div className="App" sx={{ height: '100', with: '100%' }}>
            <Box sx={{ height: '100%', with: '100%', pt:15 }}>
                <Logo />
            </Box>
            <Box>
                <Typography variant='p' sx={{ fontFamily: 'roboto', color: 'white', p: 2 }}>La mobilité en s'amusant</Typography>
            </Box>

      <Box
        sx={{ display: 'flex', justifyContent: 'center',  pt: 10, pb:10,  height: '100%', with: '100%' }}
      >
        <Box sx={{  }}><Input /></Box>
        <Box sx={{ pl: 10 }} >
            <NavLink to="/start">
                <Button />
            </NavLink>
        </Box>
      </Box>
            <Outlet />
        </div>
    );
}

export default Explen;
