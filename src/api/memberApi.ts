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

    // 닉네임 중복 확인
    const checkNickname = async ({ nickname }) => {
        return await axios.get("/api/v1/member/check-nickname", {
            params: {
                nickname,
            },
        });
    };

    // 사용자 정보 조회
    const profile = async () => {
        return await axios.get("/api/v1/member/profile");
    };

    // 초기 사용자의 감정 상태 등록
    const registerEmotions = async ({
        memberId,
        joy,
        sadness,
        fear,
        anger,
        neutral,
    }) => {
        return await axios.post("/api/v1/member/signup/emotion", {
            memberId,
            joy,
            sadness,
            fear,
            anger,
            neutral,
        });
    };

    return {
        login,
        signup,
        signupKakao,
        checkNickname,
        profile,
        registerEmotions,
    };
};
