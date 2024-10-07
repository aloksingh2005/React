import axios from 'axios';
import { apiUrl } from '../config';


// Base configuration for Axios
const baseConfig = {
    baseURL: apiUrl
};

// Function to create an Axios instance with authorization
const createAxiosInstance = (authToken = null, contentType = 'application/json') => {
    const headers = {
        ...baseConfig.headers,
        'content-type': contentType,
        ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
    };

    return axios.create({
        ...baseConfig,
        headers,
    });
};

// Create axios instance with token
export const axiosInstance = (authToken) => createAxiosInstance(authToken);

// Create axios instance for file uploads with token
export const axiosFile = (authToken) => createAxiosInstance(authToken, 'multipart/form-data');

// Create default Axios instance (no Authorization header)
export const axiosDefault = () => createAxiosInstance();
