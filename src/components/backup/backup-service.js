import axios from 'axios';

/* eslint no-underscore-dangle: 0 */
export const createBackup = () => axios.post('http://localhost:3000/backup').then(response => response.data);

export const restoreBackup = name => axios.put('http://localhost:3000/backup', { name }).then(response => response.data);

export const deleteBackup = name => axios.delete('http://localhost:3000/backup', { params: { name } });

export const getBackups = () => axios.get('http://localhost:3000/backup').then(response => response.data);

export const downloadBackup = name => axios({
  url: `http://localhost:3000/backup/download/${name}`,
  method: 'GET',
  responseType: 'blob', // important
});

export const uploadBackup = formData => axios.post('http://localhost:3000/backup/import', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
