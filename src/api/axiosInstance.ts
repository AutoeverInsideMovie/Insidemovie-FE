import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://52.79.175.149:8080",
    baseURL: "http://localhost:8080",
});

const token = sessionStorage.getItem("refreshToken");

const reissue = async (refreshToken: string | null) => {
    return axios.post(`http://localhost:8080/api/v1/member/reissue`, {
        refreshToken: refreshToken,
    });
};

const getToken = async (): Promise<void> => {
    try {
        const res = await reissue(token);
        if (res.data.status !== 200) {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
        } else {
            const accessToken: string = res.data.data.accessToken;
            sessionStorage.setItem("accessToken", accessToken);
        }
    } catch (error) {
        console.error("Error during token reissue:", error);
    }
};

axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.log(error.response);
        }
        if (error.response?.status === 401) {
            getToken();
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
