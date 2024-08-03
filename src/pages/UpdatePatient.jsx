import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PatientForm from '../components/PatientForm';
import { getPatientDetails, updatePatient } from '../services/api';
import { Container, Typography } from '@mui/material';

const UpdatePatient = () => {
    const { id } = useParams();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await getPatientDetails(id);
                setInitialData(response.data);
            } catch (error) {
            }
        };
        fetchPatient();
    }, [id]);

    const handleSubmit = async (patientData) => {
        try {
            await updatePatient(id, patientData);
        } catch (error) {
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Update Patient
            </Typography>
            {initialData && <PatientForm onSubmit={handleSubmit} initialData={initialData} />}
        </Container>
    );
};

export default UpdatePatient;
