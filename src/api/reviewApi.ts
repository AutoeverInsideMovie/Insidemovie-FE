import axios from "./axiosInstance";

export const reviewApi = () => {
    // 리뷰 목록 조회
    const getReviewList = async ({ movieId, sort, page, size }) => {
        return await axios.get(`/api/v1/movies/${movieId}/reviews`, {
            params: {
                movieId,
                sort,
                page,
                size,
            },
        });
    };

    // 내 리뷰 단건 조회
    const getMyReview = async ({ movieId }) => {
        return await axios.get(`/api/v1/movies/${movieId}/reviews/my-review`);
    };

    // 리뷰 좋아요 토글
    const likeReview = async ({ reviewId }) => {
        return await axios.post(`/api/v1/reviews/${reviewId}/like`);
    };

    return { getReviewList, getMyReview, likeReview };
};
