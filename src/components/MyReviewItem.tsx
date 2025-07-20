import React, { useState } from "react";
import StarRating from "./StarRating";
import Like from "@assets/like.svg?react";
import Unlike from "@assets/unlike.svg?react";
import joyIcon from "@assets/character/joy_icon.png";
import sadIcon from "@assets/character/sad_icon.png";
import angryIcon from "@assets/character/angry_icon.png";
import fearIcon from "@assets/character/fear_icon.png";
import disgustIcon from "@assets/character/disgust_icon.png";
import bingbongIcon from "@assets/character/bingbong_icon.png";
import { useNavigate } from "react-router-dom";
import Edit from "@assets/edit.svg?react";
import Delete from "@assets/delete.svg?react";
import ArrowRight from "@assets/arrow_right.svg?react";
import BingbongProfile from "@assets/profile/bingbong_profile.png";

interface MyReviewItemProps {
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
    isMypage?: boolean;
}

const emotionMap = {
    joy: joyIcon,
    sad: sadIcon,
    angry: angryIcon,
    fear: fearIcon,
    disgust: disgustIcon,
    bingbong: bingbongIcon,
};

const MyReviewItem: React.FC<MyReviewItemProps> = ({
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
    isMypage = false,
}) => {
    const navigate = useNavigate();

    const getTopEmotionIcon = (emotions: MyReviewItemProps["emotions"]) => {
        if (!emotions || emotions.length === 0) return null;

        const topEmotion = emotions.reduce((prev, curr) =>
            curr.value > prev.value ? curr : prev,
        );

        return topEmotion.icon;
    };

    const topEmotionIcon = getTopEmotionIcon(emotions);

    return (
        <div
            className={`bg-box_bg_white p-4 rounded-3xl text-white mb-3 ${!isMypage && "mt-10"}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <img
                        src={!profile && BingbongProfile}
                        alt="유저"
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <div className="font-normal text-sm">
                            {!nickname && "알 수 없는 사용자"}
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
                <p className="px-2">{content}</p>
            </div>

            <div className="w-full h-[1px] bg-white/10 mt-4" />

            <div className="mt-4 flex justify-start items-center text-sm text-gray-300">
                <div className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer">
                    <Unlike className="w-5 h-5" />
                    {likeCount}
                </div>
                {!isMypage && (
                    <div className="flex">
                        <div
                            className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer"
                            onClick={() => {
                                navigate("/review-write");
                            }}
                        >
                            <Edit className="w-5 h-5" />
                            수정하기
                        </div>
                        <div className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer">
                            <Delete className="w-5 h-5" />
                            삭제하기
                        </div>
                    </div>
                )}
                {isMypage && (
                    <div
                        className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer"
                        onClick={() => {
                            navigate(`/movies/detail/${movieId}`);
                        }}
                    >
                        영화 보기
                        <ArrowRight className="w-5 h-5" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReviewItem;
