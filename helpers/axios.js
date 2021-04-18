import axios from "axios";
import { getAuthToken, getRefreshToken } from "./token";

axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.request.use(
    (request) => {
        const token = getAuthToken();
        if (token && token != "undefined") {
            request.headers["Authorization"] = `Bearer ${token}`;
        }
        request.headers["Content-Type"] = "application/json";
        console.log({ request });
        return request;
    },
    (error) => {
        if (
            error.response?.status == 401 ||
            error.response?.data.message === "401 Unauthorized"
        ) {
        }
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        if (error.response?.status == 403 && !originalRequest._retry) {
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
