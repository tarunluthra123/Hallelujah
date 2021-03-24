import axios from "axios";
import { getAuthToken, getRefreshToken } from "./token";

axios.interceptors.request.use(
    (config) => {
        config.header["Authorization"] = `Bearer ${getAuthToken()}`;
        return config;
    },
    (error) => {
        if (
            error.response.status == 401 ||
            error.response.data.message === "401 Unauthorized"
        ) {
        }
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        if (error.response.status == 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAuthToken = getRefreshToken();
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${newAuthToken}`;
            return axios(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default axios;
