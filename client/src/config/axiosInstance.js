import axios from "axios";
import { store } from "../store";
import { SERVER_URL } from "../config";
// You might need to dispatch logout actions if the token fails
// import { logout } from "../store/actions/userActions"; 

const axiosInstance = axios.create({
 baseURL:`${SERVER_URL}`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

/**
 * REQUEST INTERCEPTOR
 * Attach token automatically
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add language if not present (optional global default, but we'll do it per request in the components)
    
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("Network error / Server down");
      return Promise.reject({
        message: "Network error. Please try again.",
      });
    }

    const { status, data } = error.response;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const state = store.getState();
      const refreshToken = state.refreshToken; // Assuming you store this
      
      if (!refreshToken) {
         // Fallback if no refresh token exists: force logout
         console.error("Unauthorized – token expired or invalid, no refresh token found.");
         processQueue(error, null);
         isRefreshing = false;
         // store.dispatch(logout()); // Trigger logout
         // window.location.href = '/login';
         return Promise.reject(data || error);
      }

      return new Promise(function (resolve, reject) {
        axios.post(`${SERVER_URL}/api/auth/refresh`, { token: refreshToken })
          .then(({data}) => {
             // Assuming data returns { token: "new_token", refreshToken: "new_refresh_token" }
             // Update the store with the new tokens here
             // store.dispatch(updateTokens(data));
             
             // Update the axios instance defaults
             axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
             originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
             processQueue(null, data.token);
             resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
             processQueue(err, null);
             // store.dispatch(logout());
             // window.location.href = '/login';
             reject(err);
          })
          .finally(() => {
             isRefreshing = false;
          });
      });
    }

    if (status === 403) {
      console.error("Forbidden – insufficient permissions");
    }

    if (status >= 500) {
      console.error("Server error");
    }

    return Promise.reject(data || error);
  }
);

export default axiosInstance;
