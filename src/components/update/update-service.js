import axios from '../axios-wrapper';

/* eslint no-underscore-dangle: 0 */
export const update = () => axios.post('http://localhost:3000/update').then(response => response.data);


export const getVersion = () => axios.get('http://localhost:3000/version').then(response => response.data);