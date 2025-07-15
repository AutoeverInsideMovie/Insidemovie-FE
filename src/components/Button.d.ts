import * as React from "react";
interface ButtonProps {
    text: string;
    textColor?: "white" | "black";
    buttonColor?: "kakao" | "default" | "transparent" | "disabled";
    disabled?: boolean;
    prefixIcon?: string;
    className?: string;
    onClick?: () => void;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
