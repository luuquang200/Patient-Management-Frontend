import axios from 'axios';

const API_BASE_URL = 'https://patient-service-otwul2bnna-uc.a.run.app/api';

export const getPatients = () => axios.get(`${API_BASE_URL}/patients`);
export const createPatient = (patientData) => axios.post(`${API_BASE_URL}/patients`, patientData);
export const addPatient = (patientData) => axios.post(`${API_BASE_URL}/patients/create`, patientData);
export const updatePatient = (id, patientData) => axios.put(`${API_BASE_URL}/patients/${id}`, patientData);
export const deactivatePatient = (id, reason) => axios.patch(`${API_BASE_URL}/patients/${id}/deactivate`, { reason });
export const searchPatients = ({ searchTerm, page, pageSize }) => 
    axios.get(`${API_BASE_URL}/patients/search`, { params: { searchTerm, page, pageSize } });
export const getPatientDetails = (id) => axios.get(`${API_BASE_URL}/patients/${id}`);
