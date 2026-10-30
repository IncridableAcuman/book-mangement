import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosInstance } from "axios";

const rawBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";
const baseURL = rawBaseUrl.endsWith("/api/v1")
    ? rawBaseUrl
    : `${rawBaseUrl.replace(/\/$/, "")}/api/v1`;

const axiosInstance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };
        if ((error.response?.status === 401 || error.response?.status === 403) && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await axiosInstance.get("/auth/refresh");
                const token = data.accessToken;
                if (token) {
                    localStorage.setItem("accessToken", token);
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                localStorage.removeItem("accessToken");
                if (window.location.pathname !== "/login" && window.location.pathname !== "/landing" && window.location.pathname !== "/register") {
                    window.location.href = "/landing";
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
