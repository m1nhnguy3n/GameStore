import axios from 'axios';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axiosInstance;

export const axiosPrivate = axios.create({
  baseURL: HOST_API,
  headers: { 'Content-Type': 'application/json' },
});
