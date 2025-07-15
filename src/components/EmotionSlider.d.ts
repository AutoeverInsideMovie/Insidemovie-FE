import * as React from "react";
interface EmotionSliderProps {
    name: string;
    color: string;
    image: string;
    value: number;
    onChange: (value: number) => void;
}
declare const EmotionSlider: React.FC<EmotionSliderProps>;
export default EmotionSlider;
