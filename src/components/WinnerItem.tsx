import React from "react";
import StarRating from "./StarRating";

interface WinnerItemProps {
    posterImg: string;
    posterName: string;
    emotionIcon: "joy" | "sad" | "angry" | "fear" | "disgust" | "bingbong";
    emotionValue: number;
    starValue: number;
    winnerWeek: string;
    onClick?: () => void;
}

const WinnerItem: React.FC<WinnerItemProps> = ({
    posterImg,
    posterName,
    starValue,
    winnerWeek,
    onClick,
}) => {
    return (
        <div
            className="flex w-full rounded-3xl mb-3 bg-box_bg_white items-center cursor-pointer transform transition-all duration-200 hover:bg-box_bg_white/30"
            onClick={onClick}
        >
            <img
                src={posterImg}
                alt={posterName}
                className="w-auto h-32 rounded-l-3xl object-cover me-4"
            />

            <div className="flex-1 text-white">
                <div className="text-sm font-light">{winnerWeek}</div>
                <div className="text-xl font-semibold">{posterName}</div>

                <div className="flex items-center my-2">
                    <StarRating value={starValue} readOnly />
                    <span className="ml-2 text-sm">{starValue.toFixed(1)}</span>
                </div>
            </div>
        </div>
    );
};

export default WinnerItem;
