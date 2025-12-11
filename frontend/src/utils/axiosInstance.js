import axios from "axios";
import { Base_URL } from "./apiPaths";
import { refreshAccessToken, clearAuthData } from "./tokenRefresh";

const axiosInstance = axios.create({
    baseURL: Base_URL,
    timeout: 10000,
    headers: {
        "Content-Type":"application/json",
        Accept:"application/json",
    },
    withCredentials: true, // Important: Send cookies with requests
});

// Flag to prevent multiple simultaneous refresh requests
let isRefreshing = false;
// Queue to store failed requests while token is being refreshed
let failedRequestsQueue = [];

/**
 * Process all queued requests after token refresh
 * @param {Error|null} error - Error if refresh failed, null if successful
 * @param {string|null} token - New access token if refresh succeeded
 */
const processQueue = (error, token = null) => {
    failedRequestsQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });
    failedRequestsQueue = [];
};

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // Handle 401 errors (token expired or invalid)
        if(error.response && error.response.status === 401 && !originalRequest._retry){
            
            // Skip token refresh for login, register, and refresh-token endpoints
            if (
                originalRequest.url?.includes("/login") ||
                originalRequest.url?.includes("/register") ||
                originalRequest.url?.includes("/refresh-token")
            ) {
                return Promise.reject(error);
            }

            // If token refresh is already in progress, queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            // Mark this request as retried to prevent infinite loops
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Attempt to refresh the access token
                const refreshResult = await refreshAccessToken();

                if (refreshResult.success && refreshResult.accessToken) {
                    // Token refresh succeeded
                    isRefreshing = false;
                    
                    // Process all queued requests with the new token
                    processQueue(null, refreshResult.accessToken);
                    
                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`;
                    return axiosInstance(originalRequest);
                } else {
                    // Token refresh failed
                    isRefreshing = false;
                    processQueue(new Error("Token refresh failed"), null);
                    
                    // Clear auth data and redirect to login
                    clearAuthData();
                    window.location.href = "/login";
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                // Token refresh request failed
                isRefreshing = false;
                processQueue(refreshError, null);
                
                // Clear auth data and redirect to login
                clearAuthData();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        
        // Handle other errors
        if(error.response){
            if(error.response.status === 500){
                console.error("Server error. Please try again later.");
            }
        } else if(error.code === "ECONNABORTED"){
            console.error("Request timeout. Please try again.")
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;
