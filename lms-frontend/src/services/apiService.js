import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiClient = axios.create({
  baseURL: "http://10.0.2.2:8000",
  timeout: 10000 * 5,
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

export const api = {
  get: (endpoint) => apiClient.get(endpoint, { headers: { "Cache-Control": "no-cache" } }).then((res) => res.data),
  post: (endpoint, data) => apiClient.post(endpoint, data).then((res) => res.data),
  put: (endpoint, data) => apiClient.put(endpoint, data).then((res) => res.data),
  del: (endpoint) => apiClient.delete(endpoint).then((res) => res.data),
};

// Auth functions
export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/user/login", credentials);
      if (response.token) {
        await AsyncStorage.setItem("authToken", response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/user/create", userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("authToken");
  },
};
