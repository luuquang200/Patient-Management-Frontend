import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getPatients = () => axios.get(`${API_BASE_URL}/patients`);
export const createPatient = (patientData) => axios.post(`${API_BASE_URL}/patients`, patientData);
export const updatePatient = (id, patientData) => axios.put(`${API_BASE_URL}/patients/${id}`, patientData);
export const deactivatePatient = (id, reason) => axios.patch(`${API_BASE_URL}/patients/${id}/deactivate`, { reason });
export const searchPatients = (query) => axios.get(`${API_BASE_URL}/patients/search`, { params: { query } });
export const getPatientDetails = (id) => axios.get(`${API_BASE_URL}/patients/${id}`);
