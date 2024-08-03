import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Box, Paper, InputBase, Divider, IconButton, TablePagination } from '@mui/material';
import { searchPatients, deactivatePatient } from '../services/api';
import SearchIcon from '@mui/icons-material/Search';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPatients, setTotalPatients] = useState(0);

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await searchPatients({ searchTerm, page, pageSize });
            setPatients(response.data.data.items);
            setTotalPatients(response.data.data.totalCount);
        };
        fetchPatients();
    }, [searchTerm, page, pageSize]);

    const handleDeactivate = async (id) => {
        await deactivatePatient(id);
        setPatients(patients.filter(patient => patient.id !== id));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(1); // Reset to first page on search
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage + 1); 
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(1); // Reset to first page on page size change
    };

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
                        onChange={handleSearchChange}
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
                    {patients.map((patient) => (
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
            <TablePagination
                component="div"
                count={totalPatients}
                page={page - 1}
                onPageChange={handlePageChange}
                rowsPerPage={pageSize}
                onRowsPerPageChange={handlePageSizeChange}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Container>
    );
};

export default PatientList;