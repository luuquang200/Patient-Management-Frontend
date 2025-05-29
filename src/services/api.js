import axios from 'axios';

const API_BASE_URL = 'https://patient-service-661424623133.us-central1.run.app/api';
// const API_BASE_URL = 'http://localhost:8082/api';

export const getPatients = () => axios.get(`${API_BASE_URL}/patients`);

export const createPatient = (patientData) => axios.post(`${API_BASE_URL}/patients`, patientData);

export const addPatient = (patientData) => axios.post(`${API_BASE_URL}/patients/create`, patientData);

export const updatePatient = (patientData) => {
    return axios.put(`${API_BASE_URL}/patients/update`, patientData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const deactivatePatient = (id, reason) => axios.delete(`${API_BASE_URL}/patients/deactivate/${id}`, {
    headers: {
        'Content-Type': 'application/json'
    },
    data: JSON.stringify(reason),
});

export const searchPatients = ({ searchTerm, page, pageSize }) =>
    axios.get(`${API_BASE_URL}/patients/search`, {
        params: { searchTerm, page, pageSize }
    });

export const getPatientDetails = (id) => axios.get(`${API_BASE_URL}/patients/get/${id}`);
