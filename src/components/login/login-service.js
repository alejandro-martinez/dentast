import axios from '../axios-wrapper';

// eslint-disable-next-line import/prefer-default-export
export const authenticateUser = credentials => axios.post('http://localhost:3000/auth', credentials).then(response => response.data);
