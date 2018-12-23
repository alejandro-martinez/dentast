import axios from 'axios';

/* eslint no-underscore-dangle: 0 */
export const createBackup = () => axios.post('http://localhost:3000/backup').then(response => response.data);

export const restoreBackup = () => axios.put('http://localhost:3000/backup').then(response => response.data);
