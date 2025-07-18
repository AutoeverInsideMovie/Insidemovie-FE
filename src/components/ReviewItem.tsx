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

interface ReviewItemProps {
    review_id: number;
    user_profile: string;
    user_name: string;
    date: string;
    content: string;
    like_count: number;
    star_value: number;
    spoiler: true;
    emotions: {
        icon: "joy" | "sad" | "angry" | "fear" | "disgust" | "bingbong";
        value: number;
    }[];
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
    review_id,
    user_profile,
    user_name,
    date,
    content,
    like_count,
    star_value,
    spoiler,
    emotions,
}) => {
    const [showContent, setShowContent] = useState(!spoiler); // 스포일러면 처음엔 false

    const getTopEmotionIcon = (emotions: ReviewItemProps["emotions"]) => {
        if (!emotions || emotions.length === 0) return null;

        const topEmotion = emotions.reduce((prev, curr) =>
            curr.value > prev.value ? curr : prev,
        );

        return topEmotion.icon;
    };

    const topEmotionIcon = getTopEmotionIcon(emotions);

    return (
        <div className="bg-box_bg_white p-4 rounded-3xl text-white mb-3">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <img
                        src={Profile}
                        //src={user_profile}
                        alt="유저"
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <div className="font-normal text-sm">{user_name}</div>
                        <div className="text-xs font-light text-gray-400">
                            {date}
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
                        value={star_value}
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
                <div className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer">
                    <Unlike className="w-5 h-5" />
                    {like_count}
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
