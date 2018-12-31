import axios from 'axios';
import NProgress from 'nprogress';
import '../../node_modules/nprogress/nprogress.css';

// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  NProgress.start();
  return config;
}, error => Promise.reject(error));

// Add a response interceptor
axios.interceptors.response.use((response) => {
  // Do something with response data
  NProgress.done();
  return response;
}, error => Promise.reject(error));

export default axios;
