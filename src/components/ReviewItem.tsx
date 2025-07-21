import React, { useState } from "react";
import StarRating from "./StarRating";
import Like from "@assets/like.svg?react";
import Unlike from "@assets/unlike.svg?react";
import Report from "@assets/report.svg?react";
import joyIcon from "@assets/character/joy_icon.png";
import sadIcon from "@assets/character/sad_icon.png";
import angryIcon from "@assets/character/angry_icon.png";
import fearIcon from "@assets/character/fear_icon.png";
import disgustIcon from "@assets/character/disgust_icon.png";
import bingbongIcon from "@assets/character/bingbong_icon.png";
import BingbongProfile from "@assets/profile/bingbong_profile.png";
import joyProfile from "@assets/profile/joy_profile.png";
import angryProfile from "@assets/profile/angry_profile.png";
import sadnessProfile from "@assets/profile/sad_profile.png";
import fearProfile from "@assets/profile/fear_profile.png";
import disgustProfile from "@assets/profile/disgust_profile.png";
import { reviewApi } from "../api/reviewApi";
import { timeForToday } from "../services/timeForToday";
import { ConfirmDialog } from "./ConfirmDialog";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
} from "@mui/material";

interface ReviewItemProps {
    reviewId: number;
    content: string;
    rating: number;
    spoiler?: boolean;
    createdAt: string;
    likeCount: number;
    myReview?: boolean;
    modify?: boolean;
    myLike?: boolean;
    nickname: string;
    memberId: string;
    movieId: string;
    profile: string;
    emotions: {
        icon: "joy" | "sad" | "angry" | "fear" | "disgust" | "bingbong";
        value: number;
    }[];
    isReported: boolean;
    isConcealed: boolean;
}

const emotionMap = {
    joy: joyIcon,
    sad: sadIcon,
    angry: angryIcon,
    fear: fearIcon,
    disgust: disgustIcon,
    bingbong: bingbongIcon,
};

const ReviewItem: React.FC<ReviewItemProps> = ({
    reviewId,
    content,
    rating,
    spoiler = false,
    createdAt,
    likeCount,
    myReview = false,
    modify = false,
    myLike = false,
    nickname,
    memberId,
    movieId,
    profile,
    emotions,
    isReported,
    isConcealed,
}) => {
    const [showContent, setShowContent] = useState(!spoiler); // 스포일러면 처음엔 false
    const [liked, setLiked] = useState<boolean>(Boolean(myLike));
    const [likeCountState, setLikeCountState] = useState<number>(likeCount);

    const [toastOpen, setToastOpen] = useState(false);
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success",
    );
    const [toastMessage, setToastMessage] = useState("");

    // 신고 dialog
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [reportReason, setReportReason] = useState<string>(
        "INAPPROPRIATE_LANGUAGE",
    );

    const emotionProfileMap: Record<string, string> = {
        joy: joyProfile,
        anger: angryProfile,
        sadness: sadnessProfile,
        fear: fearProfile,
        disgust: disgustProfile,
    };

    // possible reasons
    const reportReasons = [
        { value: "INAPPROPRIATE_LANGUAGE", label: "부적절한 언어 사용" },
        { value: "SEXUAL_CONTENT", label: "성적인 불쾌감 유발" },
        { value: "SPOILER", label: "줄거리 노출" },
        { value: "RUDE_BEHAVIOR", label: "무례하거나 공격적인 태도" },
        { value: "ADVERTISEMENT", label: "광고 또는 홍보성 내용" },
    ];

    const handleReportConfirm = async () => {
        try {
            await reviewApi().reportReview({ reviewId, reason: reportReason });

            setToastSeverity("success");
            setToastMessage("신고되었습니다");
        } catch (e) {
            console.error("리뷰 신고 실패:", e);

            console.error(e);
            setToastSeverity("error");
            setToastMessage("신고 중 오류가 발생했습니다");
        } finally {
            setIsReportDialogOpen(false);

            setIsReportDialogOpen(false);
            setToastOpen(true);
        }
    };

    const handleLikeToggle = async () => {
        try {
            if (liked) {
                await reviewApi().likeReview({ reviewId });
                setLikeCountState((c) => c - 1);
            } else {
                await reviewApi().likeReview({ reviewId });
                setLikeCountState((c) => c + 1);
            }
            setLiked((v) => !v);
        } catch (e) {
            console.error("리뷰 좋아요 토글 실패:", e);
        }
    };

    const getTopEmotionIcon = (emotions: ReviewItemProps["emotions"]) => {
        const list = Array.isArray(emotions) ? emotions : [];
        if (list.length === 0) return null;

        const topEmotion = list.reduce((prev, curr) =>
            curr.value > prev.value ? curr : prev,
        );
        return topEmotion.icon;
        // if (!emotions || emotions.length === 0) return null;
        //
        // const topEmotion = emotions.reduce((prev, curr) =>
        //     curr.value > prev.value ? curr : prev,
        // );
        //
        // return topEmotion.icon;
    };

    const topEmotionIcon = getTopEmotionIcon(emotions);

    return (
        <div className="bg-box_bg_white p-4 rounded-3xl text-white mb-3">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <img
                        src={
                            profile
                                ? emotionProfileMap[profile?.toLowerCase()]
                                : BingbongProfile
                        }
                        alt="Profile"
                        className="h-8 w-8 rounded-full "
                    />
                    <div>
                        <div className="font-normal text-sm">
                            {nickname ? nickname : "알 수 없는 사용자"}
                        </div>
                        <div className="text-xs font-light text-gray-400">
                            {timeForToday(createdAt)}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-box_bg_white/10 px-2 py-1 rounded-full text-sm">
                    {topEmotionIcon && (
                        <img
                            src={emotionMap[topEmotionIcon]}
                            alt={topEmotionIcon}
                            className="w-6 h-6"
                        />
                    )}
                    |
                    <StarRating
                        value={rating}
                        readOnly={true}
                        showOneStar={true}
                        showValue={true}
                        size={"small"}
                    />
                </div>
            </div>

            <div className="mt-3 text-[15px] leading-relaxed">
                {!showContent ? (
                    <div className="text-center font-extralight text-gray-200">
                        <div>이 리뷰에는 스포일러가 포함되어 있습니다.</div>
                        <button
                            onClick={() => setShowContent(true)}
                            className="mt-2 font-semibold underline text-white "
                        >
                            리뷰 보기
                        </button>
                    </div>
                ) : (
                    <p className="px-2">{content}</p>
                )}
            </div>

            <div className="w-full h-[1px] bg-white/10 mt-4" />

            <div className="mt-4 flex justify-start items-center text-sm text-gray-300">
                <div
                    className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer"
                    onClick={handleLikeToggle}
                >
                    {liked ? (
                        <Like className="w-5 h-5" />
                    ) : (
                        <Unlike className="w-5 h-5" />
                    )}
                    {likeCountState}
                </div>
                <div
                    className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer"
                    onClick={() => setIsReportDialogOpen(true)}
                >
                    <Report className="w-5 h-5" />
                    신고하기
                </div>
            </div>
            <ConfirmDialog
                className={"max-w-md"}
                isOpen={isReportDialogOpen}
                title="리뷰 신고"
                message={
                    <div className="space-y-2">
                        <div>신고 사유를 선택하세요:</div>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel id="report-reason-label">
                                신고 사유
                            </InputLabel>
                            <Select
                                labelId="report-reason-label"
                                value={reportReason}
                                label="신고 사유"
                                onChange={(e) =>
                                    setReportReason(e.target.value as string)
                                }
                            >
                                {reportReasons.map(({ value, label }) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                }
                showCancel={true}
                onCancel={() => setIsReportDialogOpen(false)}
                onConfirm={handleReportConfirm}
                isRedButton={true}
            ></ConfirmDialog>
            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={() => setToastOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setToastOpen(false)}
                    severity={toastSeverity}
                    variant="filled"
                >
                    {toastMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ReviewItem;
