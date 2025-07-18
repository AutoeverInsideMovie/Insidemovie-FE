import * as React from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import TransparentBox from "../components/TransparentBox";
import BackgroundBubble from "@assets/background_bubble.svg?react";
import SearchIcon from "@assets/search.svg?react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@assets/insidemovie_white.png";
import { movieApi } from "../api/movieApi";
import { memberApi } from "../api/memberApi";
import { ConfirmDialog } from "../components/ConfirmDialog";

import joyIcon from "@assets/character/joy_icon.png";
import sadIcon from "@assets/character/sad_icon.png";
import angryIcon from "@assets/character/angry_icon.png";
import fearIcon from "@assets/character/fear_icon.png";
import disgustIcon from "@assets/character/disgust_icon.png";

const emotionMap = {
    joy: joyIcon,
    sad: sadIcon,
    angry: angryIcon,
    fear: fearIcon,
    disgust: disgustIcon,
};
const emotionColorMap = {
    joy: "bg-joy_yellow",
    sad: "bg-sad_blue",
    angry: "bg-angry_red",
    fear: "bg-fear_purple",
    disgust: "bg-disgust_green",
};

// TODO : 에러메시지 반환 결과 출력 방법 논의 후 적용

interface LocationState {
    accessToken: string;
}

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { accessToken } = location.state as LocationState;
    const [step, setStep] = useState(2);
    const [nickname, setNickname] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<
        Array<{
            id: number;
            posterPath: string;
            title: string;
            voteAverage: number;
        }>
    >([]);
    const [selectedMovies, setSelectedMovies] = useState<
        Array<{
            id: number;
            posterPath: string;
            title: string;
            voteAverage: number;
        }>
    >([]);

    // Emotion averages for selected movies
    const [emotionAverages, setEmotionAverages] = useState<{
        joy: number;
        sad: number;
        angry: number;
        fear: number;
        disgust: number;
    }>({ joy: 0, sad: 0, angry: 0, fear: 0, disgust: 0 });

    useEffect(() => {
        const fetchEmotions = async () => {
            if (selectedMovies.length === 0) {
                setEmotionAverages({
                    joy: 0,
                    sad: 0,
                    angry: 0,
                    fear: 0,
                    disgust: 0,
                });
                return;
            }
            try {
                // Fetch emotions for all selected movies in parallel
                const promises = selectedMovies.map((movie) =>
                    movieApi().getMovieEmotions({ movieId: movie.id }),
                );
                const responses = await Promise.all(promises);
                // Extract emotion data arrays
                const totals = {
                    joy: 0,
                    anger: 0,
                    sadness: 0,
                    fear: 0,
                    neutral: 0,
                };

                responses.forEach((res) => {
                    const d = res.data.data;
                    totals.joy += Number(d.joy) || 0;
                    totals.anger += Number(d.anger) || 0;
                    totals.sadness += Number(d.sadness) || 0;
                    totals.fear += Number(d.fear) || 0;
                    totals.neutral += Number(d.neutral) || 0;
                });
                const count = selectedMovies.length || 1; // 0 나누기 방지
                setEmotionAverages({
                    joy: totals.joy / count,
                    angry: totals.anger / count, // 또는 field 이름에 맞춰 상태에 저장
                    sad: totals.sadness / count,
                    fear: totals.fear / count,
                    disgust: totals.neutral / count, // neutral을 disgust에 매핑하거나 상태명 변경
                });
            } catch (err) {
                console.error("Emotion fetch error", err);
            }
        };
        fetchEmotions();
    }, [selectedMovies]);
    const isStep2Disabled = selectedMovies.length === 0;

    const handleConfirm = () => {
        setIsDialogOpen(false);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    const handleNicknameChange = (value: string) => {
        setNickname(value);

        if (value.length < 2 || value.length > 20) {
            setNicknameError("닉네임은 2~20자 이내여야 합니다.");
        } else {
            setNicknameError("");
        }
    };

    const isStep3Disabled = !nickname || !!nicknameError;

    useEffect(() => {
        const fetchMovies = async () => {
            if (!searchTerm) {
                setSearchResults([]);
                return;
            }
            try {
                const res = await movieApi().searchTitle({
                    title: searchTerm,
                    page: 0,
                    pageSize: 10,
                });
                setSearchResults(res.data.data.content);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMovies();
    }, [searchTerm]);

    const handleSignup = async () => {
        try {
            const response = await memberApi().signupKakao({
                accessToken,
                nickname,
            });

            const { memberId } = response.data.data;
            console.log("MemberId", memberId);
            navigate("/login", { replace: true });
        } catch (error) {
            // 에러 처리: 메시지 보여주거나 console.log
            setMessage(error.response?.data?.message || error);
            setIsDialogOpen(true);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <div className="max-w-screen-xl w-full flex">
                {/* Left side with logo and background */}
                <div className="w-1/2 bg-cover bg-center relative flex items-center justify-center">
                    <BackgroundBubble className="absolute h-fit w-fit" />
                    <img src={Logo} alt="INSIDE MOVIE" className="w-56 z-10" />
                </div>

                {/* Right side with signup form */}
                <div className="w-1/2 flex items-center justify-center">
                    <TransparentBox
                        className="w-[500px] h-fit flex flex-col justify-center items-center"
                        padding="px-8 py-10"
                    >
                        {/* Step 2 UI */}
                        {/* TODO : 영화 박스오피스 Top 8 조회 후 리스트업 / 검색 시 검색한 영화 목록 리스트업 / 영화 눌러 최소 1개 선택 / 최소 1개 선택 후 버튼 활성화 */}
                        {step === 2 && (
                            <div className="w-full transition-all duration-300">
                                {/* Emotion averages display */}
                                <div className="bg-box_bg_white px-4 py-2 rounded-3xl mb-6 ring-2 ring-purple-500 ring-opacity-50 shadow-[0_0_10px_rgba(124,106,255,1.0)] transition-shadow duration-300">
                                    <div className="inline-flex gap-2 items-center justify-center">
                                        {[
                                            {
                                                icon: "joy",
                                                value: emotionAverages.joy,
                                            },
                                            {
                                                icon: "sad",
                                                value: emotionAverages.sad,
                                            },
                                            {
                                                icon: "angry",
                                                value: emotionAverages.angry,
                                            },
                                            {
                                                icon: "fear",
                                                value: emotionAverages.fear,
                                            },
                                            {
                                                icon: "disgust",
                                                value: emotionAverages.disgust,
                                            },
                                        ].map((e, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-1"
                                            >
                                                <img
                                                    src={emotionMap[e.icon]}
                                                    alt={e.icon}
                                                    className="w-4 h-4"
                                                />
                                                <div className="w-14 h-2 rounded-full bg-box_bg_white overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${emotionColorMap[e.icon]}`}
                                                        style={{
                                                            width: `${Math.round(e.value * 100)}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            placeholder="영화를 검색하세요."
                                            className="w-full py-4 px-5 pr-12 rounded-full bg-box_bg_white text-white text-sm font-light placeholder-white placeholder-opacity-60 focus:outline-none transition-shadow duration-300"
                                        />
                                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white">
                                            <SearchIcon className="w-7 h-7 opacity-40" />
                                        </div>
                                    </div>
                                </div>
                                {/* 선택된 영화 미리보기 */}
                                <div
                                    className="flex space-x-2 mb-4 overflow-x-auto hide-scrollbar"
                                    style={{
                                        msOverflowStyle: "none",
                                        scrollbarWidth: "none",
                                    }}
                                >
                                    {selectedMovies.map((movie) => (
                                        <div
                                            key={movie.id}
                                            className="relative flex-shrink-0"
                                        >
                                            <img
                                                src={movie.posterPath}
                                                alt={movie.title}
                                                className="w-12 h-16 rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedMovies((prev) =>
                                                        prev.filter(
                                                            (m) =>
                                                                m.id !==
                                                                movie.id,
                                                        ),
                                                    )
                                                }
                                                className="absolute -top-1 -right-1 bg-black bg-opacity-50 text-white w-4 h-4 flex items-center justify-center rounded-full"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-64 overflow-y-auto bg-box_bg_white p-2 rounded-3xl hide-scrollbar"
                                    style={{
                                        msOverflowStyle: "none",
                                        scrollbarWidth: "none",
                                    }}
                                >
                                    {searchResults.map((movie) => {
                                        const isSelected = selectedMovies.some(
                                            (m) => m.id === movie.id,
                                        );
                                        return (
                                            <div
                                                key={movie.id}
                                                onClick={() => {
                                                    setSelectedMovies((prev) =>
                                                        isSelected
                                                            ? prev.filter(
                                                                  (m) =>
                                                                      m.id !==
                                                                      movie.id,
                                                              )
                                                            : [...prev, movie],
                                                    );
                                                }}
                                                className={`cursor-pointer rounded overflow-hidden border-2 ${
                                                    isSelected
                                                        ? "border-movie_point"
                                                        : "border-transparent"
                                                }`}
                                            >
                                                <img
                                                    src={movie.posterPath}
                                                    alt={movie.title}
                                                    className="w-full h-auto"
                                                />
                                                <p className="text-white text-center mt-2 text-sm">
                                                    {movie.title}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <Button
                                    text="선택완료"
                                    textColor="white"
                                    buttonColor={
                                        isStep2Disabled ? "disabled" : "default"
                                    }
                                    disabled={isStep2Disabled}
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
                                    onClick={handleSignup}
                                />
                            </div>
                        )}
                    </TransparentBox>
                </div>
            </div>
            <ConfirmDialog
                isOpen={isDialogOpen}
                title="회원가입 실패"
                message={message}
                onConfirm={handleConfirm}
                showCancel={false}
                onCancel={handleCancel}
                isRedButton={true}
            />
        </div>
    );
};

export default Signup;
