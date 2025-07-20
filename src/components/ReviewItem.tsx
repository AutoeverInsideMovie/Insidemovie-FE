import React, { useState } from "react";
import Profile from "@assets/profile/joy_profile.png";
import StarRating from "./StarRating";
import Like from "@assets/like.svg?react";
import Unlike from "@assets/unlike.svg?react";
import Report from "@assets/report.svg?react";
import joyIcon from "@assets/character/joy_icon.png";
import sadIcon from "@assets/character/sad_icon.png";
import angryIcon from "@assets/character/angry_icon.png";
import fearIcon from "@assets/character/fear_icon.png";
import disgustIcon from "@assets/character/disgust_icon.png";
import bingbongIcon from "@assets/character/bingbong_icon.png";
import BingbongProfile from "@assets/profile/bingbong_profile.png";
import { reviewApi } from "../api/reviewApi";

interface ReviewItemProps {
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

const emotionMap = {
    joy: joyIcon,
    sad: sadIcon,
    angry: angryIcon,
    fear: fearIcon,
    disgust: disgustIcon,
    bingbong: bingbongIcon,
};

const ReviewItem: React.FC<ReviewItemProps> = ({
    reviewId,
    content,
    rating,
    spoiler = false,
    createdAt,
    likeCount,
    myReview = false,
    modify = false,
    myLike = false,
    nickname,
    memberId,
    movieId,
    profile,
    emotions,
    isReported,
    isConcealed,
}) => {
    const [showContent, setShowContent] = useState(!spoiler); // 스포일러면 처음엔 false
    const [liked, setLiked] = useState<boolean>(Boolean(myLike));
    const [likeCountState, setLikeCountState] = useState<number>(likeCount);

    const handleLikeToggle = async () => {
        try {
            if (liked) {
                await reviewApi().likeReview({ reviewId });
                setLikeCountState((c) => c - 1);
            } else {
                await reviewApi().likeReview({ reviewId });
                setLikeCountState((c) => c + 1);
            }
            setLiked((v) => !v);
        } catch (e) {
            console.error("리뷰 좋아요 토글 실패:", e);
        }
    };

    const getTopEmotionIcon = (emotions: ReviewItemProps["emotions"]) => {
        const list = Array.isArray(emotions) ? emotions : [];
        if (list.length === 0) return null;

        const topEmotion = list.reduce((prev, curr) =>
            curr.value > prev.value ? curr : prev,
        );
        return topEmotion.icon;
        // if (!emotions || emotions.length === 0) return null;
        //
        // const topEmotion = emotions.reduce((prev, curr) =>
        //     curr.value > prev.value ? curr : prev,
        // );
        //
        // return topEmotion.icon;
    };

    const topEmotionIcon = getTopEmotionIcon(emotions);

    return (
        <div className="bg-box_bg_white p-4 rounded-3xl text-white mb-3">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <img
                        src={profile ? profile : BingbongProfile}
                        alt="유저"
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <div className="font-normal text-sm">
                            {nickname ? nickname : "알 수 없는 사용자"}
                        </div>
                        <div className="text-xs font-light text-gray-400">
                            {createdAt}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-box_bg_white/10 px-2 py-1 rounded-full text-sm">
                    {topEmotionIcon && (
                        <img
                            src={emotionMap[topEmotionIcon]}
                            alt={topEmotionIcon}
                            className="w-6 h-6"
                        />
                    )}
                    |
                    <StarRating
                        value={rating}
                        readOnly={true}
                        showOneStar={true}
                        showValue={true}
                        size={"small"}
                    />
                </div>
            </div>

            <div className="mt-3 text-[15px] leading-relaxed">
                {!showContent ? (
                    <div className="text-center font-extralight text-gray-200">
                        <div>이 리뷰에는 스포일러가 포함되어 있습니다.</div>
                        <button
                            onClick={() => setShowContent(true)}
                            className="mt-2 font-semibold underline text-white "
                        >
                            리뷰 보기
                        </button>
                    </div>
                ) : (
                    <p className="px-2">{content}</p>
                )}
            </div>

            <div className="w-full h-[1px] bg-white/10 mt-4" />

            <div className="mt-4 flex justify-start items-center text-sm text-gray-300">
                <div
                    className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer"
                    onClick={handleLikeToggle}
                >
                    {liked ? (
                        <Like className="w-5 h-5" />
                    ) : (
                        <Unlike className="w-5 h-5" />
                    )}
                    {likeCountState}
                </div>
                <div className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer">
                    <Report className="w-5 h-5" />
                    신고하기
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
