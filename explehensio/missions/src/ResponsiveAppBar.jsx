import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >              
                <MenuItem sx={{ p: 5 }} key="/tags" onClick={handleCloseNavMenu}>
                    <Link to="/tags">
                        <Typography textAlign="center">Tags</Typography>
                    </Link>
                </MenuItem>
                <MenuItem key="/missions" onClick={handleCloseNavMenu}>
                    <Link to="/missions">
                        <Typography textAlign="center">Missions</Typography>
                    </Link>
                </MenuItem>
                <MenuItem key="/sessions" onClick={handleCloseNavMenu}>
                    <Link to="/sessions">
                        <Typography textAlign="center">Sessions</Typography>
                    </Link>
                </MenuItem>
                       
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Control
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>            
              <Button

                key="/tags"
                onClick={handleCloseNavMenu}
                component={Link}
                to="/tags"
                sx={{ p: 5 ,my: 2, color: 'white', display: 'block' }}
              >

                    <Typography sx={{fontSize: '2rem'}} textAlign="center">Tags</Typography>

              </Button>
              <Button
                key="/missions"
                onClick={handleCloseNavMenu}
                component={Link}
                to="/missions"
                sx={{ p: 5 ,my: 2, color: 'white', display: 'block' }}
              >
                    <Typography sx={{fontSize: '2rem'}} textAlign="center">Missions</Typography>
              </Button>
              <Button
                key="/sessions"
                onClick={handleCloseNavMenu}
                component={Link}
                to="/sessions"
                sx={{  p: 5 ,my: 2, color: 'white', display: 'block' }}
              >
                    <Typography sx={{fontSize: '2rem'}} textAlign="center">Sessions</Typography>
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
