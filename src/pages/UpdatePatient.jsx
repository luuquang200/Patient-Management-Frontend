import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, MenuItem, IconButton, Paper, Grid, Divider } from '@mui/material';
import { getPatientDetails, updatePatient } from '../services/api';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateContactInfo } from '../helpers/validators';

const UpdatePatient = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [patient, setPatient] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        contactInfos: [{ type: '', value: '' }],
        primaryAddress: { street: '', city: '', state: '', zipCode: '', country: '' },
        secondaryAddress: { street: '', city: '', state: '', zipCode: '', country: '' }
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchPatientDetails = async () => {
            const response = await getPatientDetails(id);
            if (response.data.success) {
                const patientData = response.data.data;
                if (!patientData.secondaryAddress) {
                    patientData.secondaryAddress = { street: '', city: '', state: '', zipCode: '', country: '' };
                }
                if (patientData.dateOfBirth) {
                    patientData.dateOfBirth = new Date(patientData.dateOfBirth).toISOString().split('T')[0];
                }
                setPatient(patientData);
            }
        };
        fetchPatientDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [field, subField] = name.split('.');
        if (subField) {
            setPatient({
                ...patient,
                [field]: {
                    ...patient[field],
                    [subField]: value,
                }
            });
        } else {
            setPatient({ ...patient, [name]: value });
        }
    };

    const handleContactInfoChange = (index, field, value) => {
        const newContactInfos = patient.contactInfos.map((info, i) =>
            i === index ? { ...info, [field]: value } : info
        );
        const error = validateContactInfo(newContactInfos[index].type, newContactInfos[index].value);
        setErrors({ ...errors, [`contactInfos.${index}`]: error });
        setPatient({ ...patient, contactInfos: newContactInfos });
    };

    const addContactInfo = () => {
        setPatient({ ...patient, contactInfos: [...patient.contactInfos, { type: '', value: '' }] });
    };

    const removeContactInfo = (index) => {
        setPatient({ ...patient, contactInfos: patient.contactInfos.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formIsValid = true;
        const newErrors = {};
        patient.contactInfos.forEach((info, index) => {
            const error = validateContactInfo(info.type, info.value);
            if (error) {
                formIsValid = false;
                newErrors[`contactInfos.${index}`] = error;
            }
        });
        setErrors(newErrors);
        if (!formIsValid) {
            toast.error("Please fix the errors before submitting.");
            return;
        }
        try {
            const response = await updatePatient(patient);
            if (response.data.success) {
                toast.success("Update successful");
                setTimeout(() => {
                    navigate('/patients');
                }, 1000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred while updating the patient");
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Update Patient
            </Typography>
            <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 5 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h2" gutterBottom align="left">
                                Demographics
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={patient.firstName}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={patient.lastName}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Gender"
                                name="gender"
                                value={patient.gender}
                                onChange={handleInputChange}
                                select
                                fullWidth
                                required
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date of Birth"
                                name="dateOfBirth"
                                value={patient.dateOfBirth}
                                onChange={handleInputChange}
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Typography variant="h6" component="h2" gutterBottom align="left" sx={{ mb: 2 }}>
                                Contact Information
                            </Typography>
                            {patient.contactInfos.map((info, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TextField
                                        label="Type"
                                        value={info.type}
                                        onChange={(e) => handleContactInfoChange(index, 'type', e.target.value)}
                                        select
                                        sx={{ mr: 1, flex: 1 }}
                                    >
                                        <MenuItem value="Phone">Phone</MenuItem>
                                        <MenuItem value="Email">Email</MenuItem>
                                    </TextField>
                                    <TextField
                                        label="Value"
                                        value={info.value}
                                        onChange={(e) => handleContactInfoChange(index, 'value', e.target.value)}
                                        error={!!errors[`contactInfos.${index}`]}
                                        helperText={errors[`contactInfos.${index}`]}
                                        sx={{ mr: 1, flex: 2 }}
                                    />
                                    <IconButton onClick={() => removeContactInfo(index)} disabled={patient.contactInfos.length <= 1}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1, mb: 2 }}>
                                <Button variant="outlined" onClick={addContactInfo} startIcon={<AddIcon />}>
                                    Add Contact Info
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h2" gutterBottom align="left">
                                Primary Address
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Street"
                                name="primaryAddress.street"
                                value={patient.primaryAddress.street}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="City"
                                name="primaryAddress.city"
                                value={patient.primaryAddress.city}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="State"
                                name="primaryAddress.state"
                                value={patient.primaryAddress.state}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Zip Code"
                                name="primaryAddress.zipCode"
                                value={patient.primaryAddress.zipCode}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Country"
                                name="primaryAddress.country"
                                value={patient.primaryAddress.country}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Typography variant="h6" component="h2" gutterBottom align="left">
                                Secondary Address
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Street"
                                name="secondaryAddress.street"
                                value={patient.secondaryAddress.street}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="City"
                                name="secondaryAddress.city"
                                value={patient.secondaryAddress.city}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="State"
                                name="secondaryAddress.state"
                                value={patient.secondaryAddress.state}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Zip Code"
                                name="secondaryAddress.zipCode"
                                value={patient.secondaryAddress.zipCode}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Country"
                                name="secondaryAddress.country"
                                value={patient.secondaryAddress.country}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button variant="contained" color="primary" type="submit">
                                Update Patient
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => navigate('/patients')}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <ToastContainer />
        </Container>
    );
};

export default UpdatePatient;
