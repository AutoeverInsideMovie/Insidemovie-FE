import * as React from "react";
import EmotionSlider from "../EmotionSlider";
import { useState } from "react";
import joyImg from "../../assets/character/joy.png";
import sadImg from "../../assets/character/sad.png";
import angryImg from "../../assets/character/angry.png";
import fearImg from "../../assets/character/fear.png";
import disgustImg from "../../assets/character/disgust.png";
import bingdbongImg from "../../assets/character/bingbong.png";
import Button from "../Button";

interface CharacterCarouselSectionProps {
    className?: string;
}

const characters = [
    joyImg,
    sadImg,
    angryImg,
    fearImg,
    disgustImg,
    bingdbongImg,
];

const CharacterCarousel: React.FC<CharacterCarouselSectionProps> = ({
    className = "",
}) => {
    const [joyValue, setJoyValue] = useState(50);
    const [sadValue, setSadValue] = useState(50);
    const [angryValue, setAngryValue] = useState(50);
    const [fearValue, setFearValue] = useState(50);
    const [disgustValue, setDisgustValue] = useState(50);
    return (
        <div className={`${className}`}>
            <div className="flex items-center justify-center space-x-4 overflow-x-auto scrollbar-hide px-2 py-4">
                <EmotionSlider
                    name="JOY"
                    color="#FFD602"
                    value={joyValue}
                    onChange={setJoyValue}
                    image={characters[0]}
                />
                <EmotionSlider
                    name="SAD"
                    color="#1169F0"
                    value={sadValue}
                    onChange={setSadValue}
                    image={characters[1]}
                />
                <EmotionSlider
                    name="ANGRY"
                    color="#DD2424"
                    value={angryValue}
                    onChange={setAngryValue}
                    image={characters[2]}
                />
                <EmotionSlider
                    name="FEAR"
                    color="#9360BD"
                    value={fearValue}
                    onChange={setFearValue}
                    image={characters[3]}
                />
                <EmotionSlider
                    name="DISGUST"
                    color="#A2C95A"
                    value={disgustValue}
                    onChange={setDisgustValue}
                    image={characters[4]}
                />
            </div>
            <Button
                text="감정 초기화"
                textColor="white"
                buttonColor="transparent"
                className="w-full"
                onClick={() => {}}
            />
        </div>
    );
};

export default CharacterCarousel;
