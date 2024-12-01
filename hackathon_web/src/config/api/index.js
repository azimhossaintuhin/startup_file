import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});




apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenResponse = await axios.post(
          "http://localhost:8000/api/v1/refresh/token/",
          {},
          {
            withCredentials: true,
          }
        );

        if (refreshTokenResponse.status === 200) {
          return api(originalRequest);
        } else {
          throw Promise.reject(error);
        }
      } catch (e) {
        throw Promise.reject(e);
      }
    } else {
      throw Promise.reject(error);
    }
  }
);


export default apiInstance;