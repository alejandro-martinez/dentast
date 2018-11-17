import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
/* eslint no-underscore-dangle: 0 */
export const getUser = userId => axios.get(`http://localhost:3000/user/${userId}`).then(response => response.data);

export const getAllUsers = () => axios.get('http://localhost:3000/user').then(response => response.data);

export const saveUser = user => axios.put(`http://localhost:3000/user/${user._id}`, user).then(response => response.data);

export const createUser = user => axios.post('http://localhost:3000/user', user).then(response => response.data);
