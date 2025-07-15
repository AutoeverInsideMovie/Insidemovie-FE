import * as React from "react";
import TransparentBox from "./TransparentBox";
import joyIcon from "../assets/character/joy_icon.png";
import sadIcon from "../assets/character/sad_icon.png";
import angryIcon from "../assets/character/angry_icon.png";
import fearIcon from "../assets/character/fear_icon.png";
import disgustIcon from "../assets/character/disgust_icon.png";
import bingbongIcon from "../assets/character/bingbong_icon.png";
import StarFull from "../assets/star_full.svg?react";

export interface PosterProps {
    posterImg: string;
    posterName: string;
    emotionIcon: "joy" | "sad" | "angry" | "fear" | "disgust" | "bingbong";
    emotionValue: number;
    starValue: number;
}

const emotionMap = {
    joy: joyIcon,
    sad: sadIcon,
    angry: angryIcon,
    fear: fearIcon,
    disgust: disgustIcon,
    bingbong: bingbongIcon,
};

const Poster: React.FC<PosterProps> = ({
    posterImg,
    posterName,
    emotionIcon = "bingbong",
    emotionValue = 0,
    starValue = 0,
}) => {
    return (
        <div className="px-1 py-3">
            <TransparentBox className="w-[180px] bg-box_bg_white rounded-xl shadow-md cursor-pointer flex flex-col transform transition-transform duration-200 hover:scale-105">
                <img
                    src={posterImg}
                    alt="posterImage"
                    className="w-full h-auto rounded-t-xl"
                />
                <div className="text-left text-white text-lg font-extralight px-2 py-1 truncate">
                    {posterName}
                </div>
                <div className="flex items-center gap-2 px-1 pb-2">
                    <div className="flex items-center text-xs font-light text-white">
                        <img
                            src={emotionMap[emotionIcon]}
                            alt={emotionIcon}
                            className="w-6 h-6"
                        />
                        <p>{emotionValue}%</p>
                    </div>
                    <div className="flex items-center text-xs font-light text-white">
                        <StarFull className="w-6 h-6" />
                        <p>{starValue}%</p>
                    </div>
                </div>
            </TransparentBox>
        </div>
    );
};

export default Poster;
