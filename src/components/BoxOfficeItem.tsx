import React from "react";
import StarRating from "./StarRating";
import joyIcon from "@assets/character/joy_icon.png";
import sadIcon from "@assets/character/sad_icon.png";
import angryIcon from "@assets/character/angry_icon.png";
import fearIcon from "@assets/character/fear_icon.png";
import disgustIcon from "@assets/character/disgust_icon.png";
import bingbongIcon from "@assets/character/bingbong_icon.png";
import type { BoxOffice } from "../interfaces/BoxOffice";

const emotionMap = {
    joy: joyIcon,
    sad: sadIcon,
    angry: angryIcon,
    fear: fearIcon,
    disgust: disgustIcon,
    bingbong: bingbongIcon,
};

const emotionColorMap = {
    joy: "bg-joy_yellow",
    sad: "bg-sad_blue",
    angry: "bg-angry_red",
    fear: "bg-fear_purple",
    disgust: "bg-disgust_green",
    bingbong: "bg-bingbong_pink",
};

const BoxOfficeItem: React.FC<BoxOffice> = ({
    rank,
    posterImg,
    posterName,
    starValue,
    emotions,
}) => {
    return (
        <div className="flex gap-3 mb-2">
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
                            {starValue.toFixed(1)}
                        </span>
                    </div>

                    <div className="inline-flex gap-2 items-center justify-center mt-2 bg-box_bg_white rounded-full px-2 py-1">
                        {emotions.map((emotion, i) => (
                            <div key={i} className="flex items-center gap-1">
                                <img
                                    src={emotionMap[emotion.icon]}
                                    alt={emotion.icon}
                                    className="w-5 h-5"
                                />
                                <div className="w-20 h-2 rounded-full bg-gray-500 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${emotionColorMap[emotion.icon]}`}
                                        style={{ width: `${emotion.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxOfficeItem;
