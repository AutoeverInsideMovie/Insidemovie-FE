import axios from "./axiosInstance";

export const movieApi = () => {
    // 영화 타이틀 검색
    const searchTitle = async ({ title, page, pageSize }) => {
        return await axios.get("/api/v1/movies/search/title", {
            params: {
                title,
                page,
                pageSize,
            },
        });
    };

    // 인기순 정렬 영화 목록 제공
    const getPopularMovies = async ({ page, pageSize }) => {
        return await axios.get("/api/v1/movies/popular", {
            params: {
                page,
                pageSize,
            },
        });
    };

    // 영화에 저장된 감정 상태 값 조회
    const getMovieEmotions = async ({ movieId }) => {
        return await axios.get(`/api/v1/movies/emotions/${movieId}`);
    };

    return {
        searchTitle,
        getPopularMovies,
        getMovieEmotions,
    };
};
