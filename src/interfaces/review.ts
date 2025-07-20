export interface Review {
    reviewId: number;
    content: string;
    rating: number;
    spoiler?: boolean;
    createdAt: string;
    likeCount: number;
    myReview?: boolean;
    modify?: boolean;
    myLike?: boolean;
    nickname: string;
    memberId: string;
    movieId: string;
    profile: string;
    emotions: {
        icon: "joy" | "sad" | "angry" | "fear" | "disgust" | "bingbong";
        value: number;
    }[];
    isReported: boolean;
    isConcealed: boolean;
}
