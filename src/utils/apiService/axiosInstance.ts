import { SERVER_URL } from './../data/data';
import axios from 'axios';
import Cookies from 'js-cookie';
const token = Cookies.get('login');

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true,
  baseURL: SERVER_URL,
});

export default axiosInstance;
