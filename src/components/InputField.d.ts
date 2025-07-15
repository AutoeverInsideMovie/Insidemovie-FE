import * as React from "react";
interface InputFieldProps {
    type: "text" | "email" | "password";
    placeholder: string;
    icon?: "email" | "password" | "nickname";
    showToggle?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    isError?: boolean;
    error?: string;
}
declare const InputField: React.FC<InputFieldProps>;
export default InputField;
