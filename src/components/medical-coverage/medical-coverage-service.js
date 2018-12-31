import axios from '../axios-wrapper';

// eslint-disable-next-line import/prefer-default-export
/* eslint no-underscore-dangle: 0 */
export const getMedicalCoverage = id => axios.get(`http://localhost:3000/medical-coverage/${id}`).then(response => response.data);

export const getAllMedicalCoverages = () => axios.get('http://localhost:3000/medical-coverage').then(response => response.data);

export const saveMedicalCoverage = medicalCoverage => axios.put(`http://localhost:3000/medical-coverage/${medicalCoverage.id}`, medicalCoverage).then(response => response.data);

export const createMedicalCoverage = medicalCoverage => axios.post('http://localhost:3000/medical-coverage', medicalCoverage).then(response => response.data);
