import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update this to match your server URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Try to get the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 errors (e.g., redirect to login page)
      console.log('Unauthorized access. Redirecting to login...');
      // You can add more logic here if needed, but don't automatically redirect
      // as it's handled in the ProductView component
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;