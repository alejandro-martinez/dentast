import axios from '../axios-wrapper';

// eslint-disable-next-line import/prefer-default-export
/* eslint no-underscore-dangle: 0 */
export const getAppointments = () => axios.get('http://localhost:3000/appointment').then(response => response.data);

export const saveAppointment = appointment => axios.put(`http://localhost:3000/appointment/${appointment._id}`, appointment).then(response => response.data);

export const createAppointment = appointment => axios.post('http://localhost:3000/appointment', appointment).then(response => response.data);

export const deleteAppointment = appointmentId => axios.delete('http://localhost:3000/appointment', { params: { _id: appointmentId } }).then(response =>
  response.data,
);
