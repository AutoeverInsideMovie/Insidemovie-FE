import React from "react";
import StarRating from "./StarRating";
import joyIcon from "@assets/character/joy_icon.png";
import sadIcon from "@assets/character/sad_icon.png";
import angryIcon from "@assets/character/angry_icon.png";
import fearIcon from "@assets/character/fear_icon.png";
import disgustIcon from "@assets/character/disgust_icon.png";
import bingbongIcon from "@assets/character/bingbong_icon.png";
import StarFull from "@assets/star_full.svg?react";
import { useNavigate } from "react-router-dom";

interface BoxOfficeItemProps {
    id: number;
    rank: string;
    posterImg: string;
    posterName: string;
    starValue: number;
    mainEmotion: string;
    mainEmotionValue: number;
}

const emotionMap = {
    joy: joyIcon,
    sad: sadIcon,
    angry: angryIcon,
    fear: fearIcon,
    disgust: disgustIcon,
    bingbong: bingbongIcon,
};

const BoxOfficeItem: React.FC<BoxOfficeItemProps> = ({
    id,
    rank,
    posterImg,
    posterName,
    starValue,
    mainEmotion,
    mainEmotionValue,
}) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex gap-3 mb-2"
            onClick={() => navigate(`/movie/detail/${id}`)}
        >
            <div className="w-[80px] text-white text-4xl font-bold text-end">
                {rank}
            </div>
            <div className="flex w-full rounded-3xl bg-box_bg_white items-center cursor-pointer transform transition-all duration-200 hover:bg-box_bg_white/30">
                <img
                    src={posterImg}
                    alt={posterName}
                    className="w-auto h-32 rounded-l-3xl object-cover me-4"
                />

                <div className="flex-1 text-white">
                    <div className="text-xl font-semibold">{posterName}</div>

                    <div className="flex items-center my-2">
                        <StarRating value={starValue} readOnly />
                        <span className="ml-2 text-sm">
                            {Number.isInteger(Number(starValue))
                                ? String(Number(starValue))
                                : Number(starValue).toFixed(1)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 px-1 pb-2">
                        <div className="flex items-center text-xs font-light text-white">
                            <img
                                src={emotionMap[mainEmotion]}
                                alt={mainEmotion}
                                className="w-6 h-6"
                            />
                            <p>{mainEmotionValue}%</p>
                        </div>
                        <div className="flex items-center text-xs font-light text-white">
                            <StarFull className="w-6 h-6" />
                            <p>{starValue}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxOfficeItem;
