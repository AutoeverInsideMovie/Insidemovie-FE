import * as React from "react";

interface ButtonProps {
    text: string;
    textColor?: "white" | "black";
    buttonColor?: "kakao" | "default" | "disabled";
    disabled?: boolean;
    prefixIcon?: string;
    className?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    text,
    textColor,
    buttonColor,
    disabled,
    prefixIcon = "",
    className = "",
    onClick,
}) => {
    const textColors = {
        white: "text-white",
        black: "text-black",
    };

    const baseColors = {
        kakao: "bg-kakao_yellow hover:bg-kakao_yellow_bright",
        default: "bg-movie_sub hover:bg-movie_bright",
        disabled: "bg-grey_300",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`rounded-full px-4 py-4 text-xs font-semibold transition duration-200 shadow-md flex items-center justify-center gap-2 ${textColors[textColor]} ${baseColors[buttonColor]} ${disabled ? "opacity-50" : ""} ${className}`}
        >
            {prefixIcon && (
                <img src={prefixIcon} alt="icon" className="w-4 h-4" />
            )}
            {text}
        </button>
    );
};

export default Button;
