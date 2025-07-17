import axios from "./axiosInstance";

export const memberApi = () => {
    const login = async ({ email, password }) => {
        return await axios.post("/api/v1/member/login", {
            email,
            password,
        });
    };

    const profile = async () => {
        return await axios.get("/api/v1/member/profile");
    };

    return {
        login,
        profile,
    };
};
