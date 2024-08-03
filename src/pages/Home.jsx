import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
    return (
        <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                Welcome to Patient Management System
            </Typography>
            <Typography variant="body1">
                This system allows you to manage patient records efficiently and effectively. Use the navigation above to get started.
            </Typography>
        </Container>
    );
};

export default Home;
