import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8080/api/v1"
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
            _retry: boolean
        };
        if((error.response?.status===401 || error.response?.status===403) && !originalRequest._retry){
            originalRequest._retry=true;
            try {
                const {data} = await axiosInstance.get("/auth/refresh");
                const token = data.accessToken;
                localStorage.setItem("accessToken",token);
                originalRequest.headers.Authorization=`Bearer ${token}`;
                return axiosInstance(originalRequest)
            } catch (error) {
                console.log(error);
                localStorage.removeItem("accessToken");
                window.location.href="/landing"
            }
        }
    },
)

export default axiosInstance;