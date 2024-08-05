import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Box, Paper, InputBase, IconButton, TablePagination, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { searchPatients, deactivatePatient } from '../services/api';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPatients, setTotalPatients] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [deactivateReason, setDeactivateReason] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await searchPatients({ searchTerm, page, pageSize });
            setPatients(response.data.data.items);
            setTotalPatients(response.data.data.totalCount);
        };
        fetchPatients();
    }, [searchTerm, page, pageSize]);

    const handleDeactivate = async () => {
        if (!deactivateReason) {
            return;
        }
        try {
            const response = await deactivatePatient(selectedPatientId, deactivateReason);
            if (response.data.success) {
                toast.success("Patient deactivated successfully");
                // Cập nhật lại danh sách bệnh nhân sau khi deactive
                const updatedPatients = patients.map(patient =>
                    patient.id === selectedPatientId ? { ...patient, isActive: false } : patient
                );
                setPatients(updatedPatients);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred while deactivating the patient");
        }
        handleClose();
    };

    const handleOpen = (id) => {
        setSelectedPatientId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPatientId(null);
        setDeactivateReason('');
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
                <Button variant="contained" color="primary" onClick={() => navigate('/add-patient')}>
                    Add Patient
                </Button>
            </Box>
            {patients.length === 0 ? (
                <Alert severity="warning">
                    <Typography>No patients were found matching your search criteria.</Typography>
                </Alert>
            ) : (
                <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>Contact Info</TableCell>
                                <TableCell>Primary Address</TableCell>
                                <TableCell>Secondary Address</TableCell>
                                <TableCell>Active Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {patients.map((patient) => (
                                <TableRow key={patient.id}>
                                    <TableCell>{patient.firstName}</TableCell>
                                    <TableCell>{patient.lastName}</TableCell>
                                    <TableCell>{patient.gender}</TableCell>
                                    <TableCell>{format(new Date(patient.dateOfBirth), 'MM/dd/yyyy')}</TableCell>
                                    <TableCell>
                                        {patient.contactInfos.map((info, index) => (
                                            <div key={index}>{info.type}: {info.value}</div>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {patient.primaryAddress && (
                                            <div>
                                                {patient.primaryAddress.street}, {patient.primaryAddress.city}, {patient.primaryAddress.state}, {patient.primaryAddress.zipCode}, {patient.primaryAddress.country}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {patient.secondaryAddress ? (
                                            <div>
                                                {[
                                                    patient.secondaryAddress.street,
                                                    patient.secondaryAddress.city,
                                                    patient.secondaryAddress.state,
                                                    patient.secondaryAddress.zipCode,
                                                    patient.secondaryAddress.country
                                                ].filter(Boolean).join(', ') || 'N/A'}
                                            </div>
                                        ) : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        {patient.isActive ? (
                                            <CheckCircleIcon color="success" />
                                        ) : (
                                            <CancelIcon color="error" />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton
                                                color="primary"
                                                component={Link}
                                                to={`/update/${patient.id}`}
                                                sx={{ mr: 1 }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                onClick={() => handleOpen(patient.id)}
                                            >
                                                <PersonOffIcon />
                                            </IconButton>
                                        </Box>
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
                </>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Deactivate Patient</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide a reason for deactivating this patient.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Reason"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={deactivateReason}
                        onChange={(e) => setDeactivateReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeactivate} color="secondary">
                        Deactivate
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </Container>
    );
};

export default PatientList;
