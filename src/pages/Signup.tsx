import * as React from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import TransparentBox from "../components/TransparentBox";
// @ts-ignore
import BackgroundBubble from "../assets/background_bubble.svg?react";
// @ts-ignore
import SearchIcon from "../assets/search.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO : 에러메시지 반환 결과 출력 방법 논의 후 적용

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const [nicknameError, setNicknameError] = useState("");

    // 이메일 확인
    const validateEmail = (email: string) => {
        const trimmed = email.trim();
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(trimmed);
    };

    // 비밀번호 확인
    const validatePassword = (password: string) => {
        const trimmed = password.trim();
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':",.<>?]).{8,}$/;
        return regex.test(trimmed);
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        setEmailError(
            validateEmail(value) ? "" : "올바른 이메일 형식이 아닙니다.",
        );
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setPasswordError(
            validatePassword(value)
                ? ""
                : "영문 대소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
        );
        // Also validate password confirmation again
        setPasswordConfirmError(
            value === passwordConfirm ? "" : "비밀번호가 일치하지 않습니다.",
        );
    };

    const handlePasswordConfirmChange = (value: string) => {
        setPasswordConfirm(value);
        setPasswordConfirmError(
            value === password ? "" : "비밀번호가 일치하지 않습니다.",
        );
    };

    const handleNicknameChange = (value: string) => {
        setNickname(value);

        if (value.length < 2 || value.length > 20) {
            setNicknameError("닉네임은 2~20자 이내여야 합니다.");
        } else {
            setNicknameError("");
        }
    };

    const isStep1Disabled =
        !email ||
        !password ||
        !passwordConfirm ||
        !!emailError ||
        !!passwordError ||
        !!passwordConfirmError;

    const isStep3Disabled = !nickname || !!nicknameError;

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <div className="max-w-screen-xl w-full flex">
                {/* Left side with logo and background */}
                <div className="w-1/2 bg-cover bg-center relative flex items-center justify-center">
                    <BackgroundBubble className="absolute h-fit w-fit" />
                    <img
                        src="/src/assets/insidemovie_white.png"
                        alt="INSIDE MOVIE"
                        className="w-56 z-10"
                    />
                </div>

                {/* Right side with signup form */}
                <div className="w-1/2 flex items-center justify-center">
                    <TransparentBox
                        className="w-[500px] h-[600px] flex flex-col justify-center items-center"
                        padding="px-8 py-10"
                    >
                        {/* === Signup Step 1: 이메일, 비밀번호 입력 === */}
                        {/* Step 1 UI */}
                        {step === 1 && (
                            <div className="w-full">
                                <p className="text-white font-light text-xl mb-20 w-full">
                                    <span className="text-movie_point font-bold">
                                        인사이드무비
                                    </span>
                                    에 오신 것을 환영합니다.
                                </p>
                                <InputField
                                    type="email"
                                    placeholder="이메일"
                                    icon="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    isError={true}
                                    error={emailError}
                                />
                                <InputField
                                    type="password"
                                    placeholder="비밀번호"
                                    icon="password"
                                    showToggle
                                    value={password}
                                    onChange={handlePasswordChange}
                                    isError={true}
                                    error={passwordError}
                                />
                                <InputField
                                    type="password"
                                    placeholder="비밀번호 확인"
                                    icon="password"
                                    showToggle
                                    value={passwordConfirm}
                                    onChange={handlePasswordConfirmChange}
                                    isError={true}
                                    error={passwordConfirmError}
                                />
                                <Button
                                    text="다음"
                                    textColor="white"
                                    buttonColor={
                                        isStep1Disabled ? "disabled" : "default"
                                    }
                                    className="w-full mt-10"
                                    disabled={isStep1Disabled}
                                    onClick={() => setStep(2)}
                                />
                            </div>
                        )}

                        {/* Step 2 UI */}
                        {/* TODO : 영화 박스오피스 Top 8 조회 후 리스트업 / 검색 시 검색한 영화 목록 리스트업 / 영화 눌러 최소 1개 선택 / 최소 1개 선택 후 버튼 활성화 */}
                        {step === 2 && (
                            <div className="w-full">
                                <div className="flex justify-between items-center mb-2 px-1">
                                    <div className="text-white font-semibold text-xl">
                                        좋아하는 영화를 골라주세요!
                                    </div>
                                </div>
                                <div className="text-white font-light mb-5 text-sm px-1">
                                    당신의 감정 취향을 분석해 맞춤 영화를
                                    찾아드릴게요.
                                </div>
                                <div className="w-full mb-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="영화를 검색하세요."
                                            className="w-full py-4 px-5 pr-12 rounded-full bg-box_bg_white text-white text-sm font-light placeholder-white placeholder-opacity-60 focus:outline-none"
                                        />
                                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white">
                                            <SearchIcon className="w-7 h-7 opacity-40" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 mb-8">
                                    {Array.from({ length: 8 }).map(
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-md overflow-hidden shadow-md"
                                            >
                                                <img
                                                    src="/src/assets/sample_poster.png"
                                                    alt={`Movie ${index + 1}`}
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        ),
                                    )}
                                </div>
                                <Button
                                    text="선택완료"
                                    textColor="white"
                                    buttonColor="default"
                                    disabled={false}
                                    className="w-full"
                                    onClick={() => setStep(3)}
                                />
                            </div>
                        )}

                        {/* Step 3 UI */}
                        {step === 3 && (
                            <div className="w-full">
                                <div className="text-white text-xl mb-6 w-full">
                                    <span className="text-white font-bold">
                                        당신의 감정은{" "}
                                    </span>
                                    {/* TODO : 감정 결과 별 이름 반환 */}
                                    <span className="text-joy_yellow font-bold">
                                        기쁨
                                    </span>
                                    <span className="text-white">이네요.</span>
                                    <p className="text-sm mt-1 font-light">
                                        서비스를 이용하기 위한 추가 정보를
                                        입력해주세요.
                                    </p>
                                </div>

                                {/* Profile Preview */}
                                <div className="bg-box_bg_white w-full rounded-3xl py-5 px-6 flex flex-col items-center gap-3 mb-8">
                                    {/* TODO : 감정 결과 별 이미지 반환 */}
                                    <img
                                        src="/src/assets/profile/joy_profile.png"
                                        alt="Emotion Joy"
                                        className="w-36 h-36 rounded-full"
                                    />
                                    <p className="text-white text-xs font-light">
                                        이후 마이페이지에서 변경 가능합니다.
                                    </p>
                                </div>

                                {/* Nickname Input */}
                                {/* TODO : 닉네임 중복 확인 */}
                                <InputField
                                    type="text"
                                    placeholder="닉네임"
                                    icon="nickname"
                                    value={nickname}
                                    onChange={handleNicknameChange}
                                    isError={true}
                                    error={nicknameError}
                                />

                                <Button
                                    text="회원가입 완료"
                                    textColor="white"
                                    buttonColor={
                                        isStep3Disabled ? "disabled" : "default"
                                    }
                                    className="w-full mt-10"
                                    disabled={isStep3Disabled}
                                    onClick={() =>
                                        navigate("/", { replace: true })
                                    }
                                />
                            </div>
                        )}
                    </TransparentBox>
                </div>
            </div>
        </div>
    );
};

export default Signup;
