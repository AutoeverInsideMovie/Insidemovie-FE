import axios from "./axiosInstance";

export const memberApi = () => {
    // 이메일 로그인
    const login = async ({ email, password }) => {
        return await axios.post("/api/v1/member/login", {
            email,
            password,
        });
    };

    // 이메일 회원가입
    const signup = async ({ email, password, checkedPassword, nickname }) => {
        return await axios.post("/api/v1/member/signup", {
            email,
            password,
            checkedPassword,
            nickname,
        });
    };

    // 카카오 회원가입
    const signupKakao = async ({ accessToken, nickname }) => {
        return await axios.post("/api/v1/member/kakao-signup", {
            accessToken,
            nickname,
        });
    };

    const profile = async () => {
        return await axios.get("/api/v1/member/profile");
    };

    return {
        login,
        profile,
        signup,
        signupKakao,
    };
};
