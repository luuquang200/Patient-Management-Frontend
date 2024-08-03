import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', p: 2, mt: 4 }}>
            <Typography variant="body1" align="center" color="white">
                © 2024 Patient App LNQ. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
