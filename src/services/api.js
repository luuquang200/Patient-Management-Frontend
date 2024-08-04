import axios from 'axios';

const API_BASE_URL = 'https://patient-service-otwul2bnna-uc.a.run.app/api';
// const API_BASE_URL = 'http://localhost:8082/api';

export const getPatients = () => axios.get(`${API_BASE_URL}/patients`);
export const createPatient = (patientData) => axios.post(`${API_BASE_URL}/patients`, patientData);
export const getPatientById = (id) => axios.get(`${API_BASE_URL}/patients/get/${id}`);
export const addPatient = (patientData) => axios.post(`${API_BASE_URL}/patients/create`, patientData);
export const updatePatient = (patientData) => {
    return axios.put(`${API_BASE_URL}/patients/update`, patientData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
export const deactivatePatient = (id, reason) => axios.patch(`${API_BASE_URL}/patients/${id}/deactivate`, {
    reason
});
export const searchPatients = ({ searchTerm, page, pageSize }) =>
    axios.get(`${API_BASE_URL}/patients/search`, {
        params: { searchTerm, page, pageSize }
    });
export const getPatientDetails = (id) => axios.get(`${API_BASE_URL}/patients/get/${id}`);
