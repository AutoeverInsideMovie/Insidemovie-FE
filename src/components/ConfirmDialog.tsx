import React, { useEffect } from "react";

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
                className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-medium mb-2">{title}</h3>
                {message && <p className="text-gray-600 mb-4">{message}</p>}
                <div className="flex justify-end space-x-3">
                    {showCancel && (
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                        >
                            취소
                        </button>
                    )}
                    <button
                        onClick={onConfirm}
                        className={`
                            px-4 py-2 rounded text-white transition
                            ${
                                isRedButton
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-blue-800 hover:bg-blue-900"
                            }
                        `}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};
