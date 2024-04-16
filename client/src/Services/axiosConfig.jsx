// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Your base URL here
  timeout: 10000, // Optional timeout configuration
  headers: {
    'Content-Type': 'application/json',
    // You can add any default headers here
  },
});

export default instance;
