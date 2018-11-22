import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
/* eslint no-underscore-dangle: 0 */
export const getPatient = patientId => axios.get(`http://localhost:3000/patient/${patientId}`).then(response => response.data);

export const getAllPatients = () => axios.get('http://localhost:3000/patient').then(response => response.data);

export const savePatient = patient => axios.put(`http://localhost:3000/patient/${patient._id}`, patient).then(response => response.data);

export const createPatient = patient => axios.post('http://localhost:3000/patient', patient).then(response => response.data);
