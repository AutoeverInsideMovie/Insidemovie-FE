import React, { useState, useEffect } from "react";
import { memberApi } from "../../../api/memberApi";
import Edit from "@assets/edit.svg?react";
import joyProfile from "@assets/profile/joy_profile.png";
import angryProfile from "@assets/profile/angry_profile.png";
import sadnessProfile from "@assets/profile/sad_profile.png";
import fearProfile from "@assets/profile/fear_profile.png";
import disgustProfile from "@assets/profile/disgust_profile.png";
import bingbongProfile from "@assets/profile/bingbong_profile.png";
import Button from "../../../components/Button";
import LikeMovieSection from "../../../components/mypage/LikeMovieSection";
import WatchMovieSection from "../../../components/mypage/WatchMovieSection";
import MyReviewSection from "../../../components/mypage/MyReviewSection";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
import InputField from "../../../components/InputField";

interface UserInfo {
    memberId: number;
    email: string;
    nickname: string;
    reportCount: number;
    watchMovieCount: number;
    likeCount: number;
    repEmotionType: string;
    authority: string;
}

const MyPage: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const emotionProfileMap: Record<string, string> = {
        joy: joyProfile,
        anger: angryProfile,
        sadness: sadnessProfile,
        fear: fearProfile,
        disgust: disgustProfile,
    };

    const [isEditMode, setIsEditMode] = useState(false);
    const [editedNickname, setEditedNickname] = useState("");
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [isPwdDialogOpen, setIsPwdDialogOpen] = useState(false);
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [currentError, setCurrentError] = useState("");
    const [newError, setNewError] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [isPasswordChangeConfirm, setIsPasswordChangeConfirm] =
        useState(false);
    const [isPwdSuccessOpen, setIsPwdSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // --- Password change form validity (reactive, like signup) ---
    const isPwdFormValid =
        currentPwd.trim() !== "" &&
        newPwd.trim() !== "" &&
        confirmPwd.trim() !== "" &&
        !currentError &&
        !newError &&
        !confirmError;

    useEffect(() => {
        memberApi()
            .profile()
            .then((res) => {
                setUserInfo(res.data.data);
                setEditedNickname(res.data.data.nickname);
            })
            .catch((err) => {
                console.error("Failed to load user info", err);
            });
    }, []);

    return (
        <div className="flex justify-center">
            <div className="max-w-screen-lg w-full flex flex-col pt-20 py-36">
                <h1 className="text-white text-3xl font-semibold pb-14 text-left">
                    마이페이지
                </h1>

                {/* 프로필 */}
                <div className="flex items-center space-x-10 mb-8">
                    <img
                        src={
                            userInfo
                                ? emotionProfileMap[
                                      userInfo.repEmotionType?.toLowerCase()
                                  ]
                                : bingbongProfile
                        }
                        alt="avatar"
                        className="w-36 h-36 rounded-full"
                    />
                    <div className="w-full">
                        <h2 className="text-white text-3xl font-normal flex items-center">
                            {isEditMode ? (
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={editedNickname}
                                        maxLength={20}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setEditedNickname(
                                                val.length > 20
                                                    ? val.slice(0, 20)
                                                    : val,
                                            );
                                        }}
                                        className="bg-transparent border-b border-gray-300 text-white focus:outline-none"
                                    />
                                    <Button
                                        text="저장"
                                        onClick={() => setIsConfirmOpen(true)}
                                        className="ml-3 bg-movie_point text-white px-5 py-1 rounded"
                                    />
                                    <Button
                                        text="취소"
                                        textColor="white"
                                        buttonColor="transparent"
                                        onClick={() => {
                                            setIsEditMode(false);
                                            setEditedNickname(
                                                userInfo?.nickname || "",
                                            );
                                        }}
                                        className="ml-2 bg-gray-600 text-white px-5 py-1 rounded"
                                    />
                                </div>
                            ) : (
                                <>
                                    {userInfo?.nickname ?? ""}
                                    <Edit
                                        className="ml-3 text-gray-300 cursor-pointer hover:bg-box_bg_white rounded p-1"
                                        onClick={() => setIsEditMode(true)}
                                    />
                                </>
                            )}
                        </h2>
                        <p className="text-gray-400 font-light text-sm mt-2">
                            {userInfo?.email ?? ""}
                        </p>
                    </div>
                    <Button
                        text={"비밀번호 변경"}
                        textColor={"black"}
                        buttonColor={"white"}
                        onClick={() => setIsPwdDialogOpen(true)}
                        className="min-w-32 bg-white text-gray-800 px-4 py-2 rounded-full"
                    />
                </div>

                {/* Statistics bar */}
                <div className="bg-gray-700 bg-opacity-50 rounded-xl p-6 flex justify-around text-center text-white mb-12">
                    <div className="w-full">
                        <p className="text-2xl font-bold">
                            {userInfo?.likeCount ?? 0}
                        </p>
                        <p className="font-light">좋아요</p>
                    </div>
                    <div className="border-l border-gray-500 mx-6" />
                    <div className="w-full">
                        <p className="text-2xl font-bold">
                            {userInfo?.watchMovieCount ?? 0}
                        </p>
                        <p className="font-light">봤어요</p>
                    </div>
                </div>

                {/* Calendar */}
                {/*<div className="mb-12">/!*<Calendar />*!/</div>*/}

                {/* Liked movies section */}
                <LikeMovieSection className="mt-24" />
                <WatchMovieSection className="mt-24" />
                <MyReviewSection className="mt-24" />
            </div>

            {isPwdDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-box_bg_white/90 rounded-3xl w-11/12 max-w-md p-8">
                        <h2 className="text-center text-xl font-bold mb-6">
                            비밀번호 변경
                        </h2>
                        {/* Current Password */}
                        <InputField
                            type="password"
                            placeholder="현재 비밀번호 입력"
                            icon="password"
                            showToggle={true}
                            value={currentPwd}
                            onChange={(value: string) => {
                                setCurrentPwd(value);
                                setCurrentError("");
                            }}
                            isError={currentError !== ""}
                            error={currentError}
                        />
                        {/* New Password */}
                        <InputField
                            type="password"
                            placeholder="신규 비밀번호 입력"
                            icon="password"
                            showToggle={true}
                            value={newPwd}
                            onChange={(value: string) => {
                                setNewPwd(value);
                                // Validate new password pattern
                                const regex =
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':",.<>?]).{8,}$/;
                                if (!regex.test(value)) {
                                    setNewError(
                                        "PW는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
                                    );
                                } else {
                                    setNewError("");
                                }
                                // Also re-validate confirm error if confirmPwd is not empty
                                if (confirmPwd) {
                                    setConfirmError(
                                        value === confirmPwd
                                            ? ""
                                            : "PW가 일치하지 않습니다.",
                                    );
                                }
                            }}
                            isError={newError !== ""}
                            error={newError}
                        />
                        {/* Confirm Password */}
                        <InputField
                            type="password"
                            placeholder="신규 비밀번호 확인"
                            icon="password"
                            showToggle={true}
                            value={confirmPwd}
                            onChange={(value: string) => {
                                setConfirmPwd(value);
                                // Validate confirm password matches newPwd
                                setConfirmError(
                                    value === newPwd
                                        ? ""
                                        : "PW가 일치하지 않습니다.",
                                );
                            }}
                            isError={confirmError !== ""}
                            error={confirmError}
                        />
                        <div className="text-center flex gap-3">
                            <Button
                                text="취소"
                                textColor="black"
                                buttonColor="white"
                                className="w-full mt-4"
                                disabled={false}
                                onClick={() => {
                                    setIsPwdDialogOpen(false);
                                }}
                            />
                            <Button
                                text="비밀번호 변경"
                                textColor="white"
                                buttonColor={
                                    isPwdFormValid ? "default" : "disabled"
                                }
                                className="w-full mt-4"
                                disabled={!isPwdFormValid}
                                onClick={() => {
                                    setIsPasswordChangeConfirm(true);
                                    setIsConfirmOpen(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={isConfirmOpen}
                title={
                    isPasswordChangeConfirm ? "비밀번호 변경" : "닉네임 변경"
                }
                message={
                    isPasswordChangeConfirm
                        ? "비밀번호를 변경하시겠습니까?"
                        : "닉네임을 변경하시겠습니까?"
                }
                showCancel={true}
                isRedButton={false}
                onConfirm={async () => {
                    if (isPasswordChangeConfirm) {
                        try {
                            await memberApi().changePassword({
                                password: currentPwd,
                                newPassword: newPwd,
                                confirmNewPassword: confirmPwd,
                            });
                            setIsPwdDialogOpen(false);
                            setIsPasswordChangeConfirm(false);
                            setIsConfirmOpen(false);
                            setCurrentPwd("");
                            setNewPwd("");
                            setConfirmPwd("");
                            setCurrentError("");
                            setNewError("");
                            setConfirmError("");
                            window.dispatchEvent(new Event("profileUpdated"));
                            setSuccessMessage(
                                "비밀번호가 성공적으로 변경되었습니다.",
                            );
                            setIsPwdSuccessOpen(true);
                        } catch (err) {
                            setErrorMessage(
                                err.response?.data?.message ||
                                    "비밀번호 변경에 실패했습니다.",
                            );
                            setIsErrorOpen(true);
                            setIsConfirmOpen(false);
                        }
                    } else {
                        if (
                            editedNickname.length < 2 ||
                            editedNickname.length > 20
                        ) {
                            setErrorMessage("닉네임은 2~20자 이내여야 합니다.");
                            setIsConfirmOpen(false);
                            setIsErrorOpen(true);
                        } else {
                            try {
                                await memberApi().changeNickname({
                                    nickname: editedNickname,
                                });
                                setUserInfo((prev) =>
                                    prev
                                        ? { ...prev, nickname: editedNickname }
                                        : prev,
                                );
                                setIsEditMode(false);
                                window.dispatchEvent(
                                    new Event("profileUpdated"),
                                );
                            } catch (err) {
                                setErrorMessage(
                                    err.response?.data?.message ||
                                        "이미 사용중인 닉네임입니다.",
                                );
                                setIsErrorOpen(true);
                            } finally {
                                setIsConfirmOpen(false);
                            }
                        }
                    }
                }}
                onCancel={() => {
                    setIsConfirmOpen(false);
                    if (isPasswordChangeConfirm) {
                        setIsPasswordChangeConfirm(false);
                    }
                }}
            />
            <ConfirmDialog
                isOpen={isErrorOpen}
                title="변경 실패"
                message={errorMessage}
                showCancel={false}
                isRedButton={true}
                onConfirm={() => setIsErrorOpen(false)}
                onCancel={function (): void {
                    throw new Error("Function not implemented.");
                }}
            />
            <ConfirmDialog
                isOpen={isPwdSuccessOpen}
                title="비밀번호 변경 완료"
                message={successMessage}
                showCancel={false}
                isRedButton={false}
                onConfirm={() => setIsPwdSuccessOpen(false)}
                onCancel={() => setIsPwdSuccessOpen(false)}
            />
        </div>
    );
};

export default MyPage;
