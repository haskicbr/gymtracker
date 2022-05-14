import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';

const baseUrl = (isDevelopment) ? "http://localhost:3000" : "https://api.dogegym.ru"

const axiosConfig = {
  baseURL: baseUrl,
  timeout: 30000,
};

const instance = axios.create(axiosConfig);

export default instance;
