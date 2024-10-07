import { axiosDefault, axiosFile, axiosInstance } from "app/utils/axiosConfig";
import {
    decryptData,
    decryptDataFromAPI,
    encryptData,
    encryptDataForAPI,
    encryptIdForAPI
} from "app/utils/cryptoUtils";
import { retrieveTokenAndUserData } from "app/utils/tokenManager";

const ApiService = () => {
    const { token: authToken } = retrieveTokenAndUserData(true); // Get authToken from context

    const defaultHttp = axiosDefault();
    const http = axiosInstance(authToken);
    const httpFile = axiosFile(authToken);

    return {
        // Default request handling
        default: async (endpoint, data) => {
            try {
                const formData = new FormData();
                formData.append('data', JSON.stringify(encryptData(data)));

                const { data: responseData } = await defaultHttp.post(endpoint, formData);

                if (responseData?.success) {
                    const { encryptedData, iv, salt } = responseData.data;
                    const decryptedData = decryptData(encryptedData, salt, iv);

                    return {
                        success: responseData.success,
                        data: decryptedData,
                        message: responseData.message,
                    };
                }

                return responseData;

            } catch (error) {
                console.error(`Error at ${endpoint}:`, error);
                throw error;
            }
        },

        // Get all items
        getAll: async (endpoint) => {
            try {
                const response = await http.get(endpoint);
                const decryptedData = decryptDataFromAPI(response.data.encryptedData, response.data.iv, authToken);
                return decryptedData;
            } catch (error) {
                console.error(`Error fetching data from ${endpoint}:`, error);
                throw error;
            }
        },

        // Get a single item by ID
        getById: async (endpoint, id) => {
            try {
                const { encryptedId, iv } = encryptIdForAPI(id, authToken);
                const response = await http.get(`${endpoint}/${encryptedId}`, { params: { iv } });
                const decryptedData = decryptDataFromAPI(response.data.encryptedData, response.data.iv, authToken);
                return decryptedData;
            } catch (error) {
                console.error(`Error fetching data from ${endpoint}/${id}:`, error);
                throw error;
            }
        },

        // Create a new item
        create: async (endpoint, data) => {
            try {
                const { encryptedData, iv } = encryptDataForAPI(data, authToken);
                const formData = new FormData();
                formData.append('data', encryptedData);
                formData.append('iv', iv);

                const response = await httpFile.post(endpoint, formData);
                const decryptedData = decryptDataFromAPI(response.data.encryptedData, response.data.iv, authToken);
                return decryptedData;
            } catch (error) {
                console.error(`Error creating data at ${endpoint}:`, error);
                throw error;
            }
        },

        // Update an existing item
        update: async (endpoint, id, data) => {
            try {
                const { encryptedId, iv: idIv } = encryptIdForAPI(id, authToken);
                const { encryptedData, iv } = encryptDataForAPI(data, authToken);
                const formData = new FormData();
                formData.append('id', encryptedId);
                formData.append('idIv', idIv);
                formData.append('data', encryptedData);
                formData.append('dataIv', iv);

                const response = await httpFile.put(`${endpoint}/${encryptedId}`, formData);
                const decryptedData = decryptDataFromAPI(response.data.encryptedData, response.data.iv, authToken);
                return decryptedData;
            } catch (error) {
                console.error(`Error updating data at ${endpoint}/${id}:`, error);
                throw error;
            }
        },

        // Delete an item
        delete: async (endpoint, id) => {
            try {
                const { encryptedId, iv } = encryptIdForAPI(id, authToken);
                const response = await http.delete(`${endpoint}/${encryptedId}`, { params: { iv } });
                const decryptedData = decryptDataFromAPI(response.data.encryptedData, response.data.iv, authToken);
                return decryptedData;
            } catch (error) {
                console.error(`Error deleting data at ${endpoint}/${id}:`, error);
                throw error;
            }
        }
    };
};

export default ApiService;
