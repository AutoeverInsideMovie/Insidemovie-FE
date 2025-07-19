import React, { useEffect } from "react";
import Button from "./Button";

interface ConfirmDialogProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    showCancel?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    isRedButton?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen = false,
    title = "",
    message = "",
    showCancel = true,
    onConfirm,
    onCancel,
    isRedButton = false,
}) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onCancel]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => onCancel()}
        >
            <div
                className="bg-grey_100 rounded-3xl max-w-md w-full p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
                {message && (
                    <p className="text-gray-600 text-sm font-medium mb-4 text-center">
                        {message}
                    </p>
                )}
                <div className="flex justify-center space-x-3 px-3">
                    {showCancel && (
                        <Button
                            text={"취소"}
                            textColor={"black"}
                            buttonColor={"white"}
                            disabled={false}
                            prefixIcon={null}
                            onClick={onCancel}
                            className="shadow-xl hover:bg-white/70 transition w-full"
                        />
                    )}
                    <Button
                        text={"확인"}
                        textColor={"black"}
                        buttonColor={"default"}
                        disabled={false}
                        prefixIcon={null}
                        onClick={onConfirm}
                        className={`
                            text-white transition w-full
                            ${
                                isRedButton
                                    ? "bg-error_red hover:bg-error_red/70"
                                    : ""
                            }
                        `}
                    />
                </div>
            </div>
        </div>
    );
};
