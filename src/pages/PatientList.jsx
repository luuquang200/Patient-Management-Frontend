import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Box, Paper, InputBase, Divider, IconButton } from '@mui/material';
import { getPatients, deactivatePatient } from '../services/api';
import SearchIcon from '@mui/icons-material/Search';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await getPatients();
            setPatients(response.data);
        };
        fetchPatients();
    }, []);

    const handleDeactivate = async (id) => {
        await deactivatePatient(id);
        setPatients(patients.filter(patient => patient.id !== id));
    };

    const filteredPatients = patients.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Patient List
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', flexGrow: 1, mr: 2 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Patients"
                        inputProps={{ 'aria-label': 'search patients' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Button variant="contained" color="primary" component={Link} to="/add">
                    Add Patient
                </Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Date of Birth</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPatients.map((patient) => (
                        <TableRow key={patient.id}>
                            <TableCell>{patient.firstName}</TableCell>
                            <TableCell>{patient.lastName}</TableCell>
                            <TableCell>{patient.gender}</TableCell>
                            <TableCell>{patient.dateOfBirth}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to={`/update/${patient.id}`}
                                    sx={{ mr: 1 }}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDeactivate(patient.id)}
                                >
                                    Deactivate
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default PatientList;