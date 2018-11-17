import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
/* eslint no-underscore-dangle: 0 */
export const get = id => axios.get(`http://localhost:3000//${id}`).then(response => response.data);

export const getAll = () => axios.get('http://localhost:3000/').then(response => response.data);

export const save = medicalCoverage => axios.put(`http://localhost:3000/medicalCoverage/${medicalCoverage._id}`, ).then(response => response.data);

export const create = medicalCoverage => axios.post('http://localhost:3000/', medicalCoverage).then(response => response.data);
