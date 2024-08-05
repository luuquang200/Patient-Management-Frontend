import React from 'react';
import { AppBar, Box, Button, Divider, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube'; 
import Logo from '../assets/logo.svg';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent" elevation={1}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Logo} alt="Logo" style={{ height: '50px', marginRight: '16px' }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Patient Management
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/patients" sx={{ mr: 2 }}>
                            Patients
                        </Button>
                        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                        <Tooltip title="GitHub repository" arrow>
                            <IconButton color="primary" size="large" component="a" href="https://github.com/luuquang200/Patient-Management-Frontend" target="_blank" sx={{ mr: 2 }}>
                                <GitHubIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
