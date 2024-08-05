import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LockIcon from '@mui/icons-material/Lock';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Home = () => {
    return (
        <Container sx={{mt: 20}}>
            <Box sx={{ my: 4, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to Patient Management System
                </Typography>
                <Typography variant="body1" gutterBottom>
                    This system allows you to manage patient records efficiently and effectively.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/patients"
                    sx={{ mt: 2 }}
                >
                    View Patients
                </Button>
            </Box>
            
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <PersonAddIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                            <Typography gutterBottom variant="h5" component="div">
                                Manage Patients
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Easily add, update, and manage patient records in one place.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <HealthAndSafetyIcon sx={{ fontSize: 50, color: 'secondary.main' }} />
                            <Typography gutterBottom variant="h5" component="div">
                                Monitor Health
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Keep track of patient health status and history with detailed records.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <LockIcon sx={{ fontSize: 50, color: 'error.main' }} />
                            <Typography gutterBottom variant="h5" component="div">
                                Secure Data
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Ensure patient data is protected with top-notch security measures.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <AccessTimeIcon sx={{ fontSize: 50, color: 'success.main' }} />
                            <Typography gutterBottom variant="h5" component="div">
                                Easy Access
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Access patient information anytime and anywhere.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
