import React from 'react';
import PatientForm from '../components/PatientForm';
import { createPatient } from '../services/api';
import { Container, Typography } from '@mui/material';

const AddPatient = () => {
    const handleSubmit = async (patientData) => {
        try {
            await createPatient(patientData);
        } catch (error) {
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Add Patient
            </Typography>
            <PatientForm onSubmit={handleSubmit} />
        </Container>
    );
};

export default AddPatient;
