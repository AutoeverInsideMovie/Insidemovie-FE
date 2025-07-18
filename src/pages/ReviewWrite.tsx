import * as React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// 에셋
import Button from "../components/Button";
import TransparentBox from "../components/TransparentBox";
// 날짜 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../assets/calendar.svg?react";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";

// 평점 라이브러리
import SamplePoster from "@assets/sample_poster.png";
import StarRating from "../components/StarRating";

interface Movie {
    id: number;
    image: string;
    title: string;
    genre: string;
    releaseYear: string;
}

const ReviewWrite: React.FC = () => {
    const [movie, setMovie] = useState<Movie | null>(null);

    const [content, setContent] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [spoilerType, setSpoilerType] = useState<boolean>(false);
    const [watchedAt, setWatchedAt] = useState<Date | null>();

    const [isEditMode, setIsEditMode] = useState(false);
    const [reviewId, setReviewId] = useState<number | null>(null);

    const navigate = useNavigate();

    // 달력 아이콘으로 달력 열기
    const datePickerRef = useRef<ReactDatePicker | null>(null);
    const openCalendar = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setOpen(true);
        }
    };
    // 최초 마운트
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get<Movie>("/mock/movie1.json");
                setMovie(res.data);
                console.log("불러온 영화 정보 : ", res.data);

                const reviewIdFromParams = new URLSearchParams(
                    window.location.search,
                ).get("reviewId");
                if (reviewIdFromParams) {
                    setIsEditMode(true);
                    setReviewId(Number(reviewIdFromParams));
                    try {
                        const reviewRes = await axios.get(
                            `/mock/reviewEdit.json`,
                        );
                        setContent(reviewRes.data.content);
                        setRating(reviewRes.data.rating);
                        setWatchedAt(new Date(reviewRes.data.watchedAt));
                        setSpoilerType(reviewRes.data.spoilerType);
                    } catch (e) {
                        console.error("리뷰 정보 조회 에러:", e);
                    }
                }
            } catch (e) {
                console.error("영화 정보 조회 에러!! : ", e);
            }
        })();
    }, []);

    // 제출
    const handleSubmit = async () => {
        if (!content.trim()) {
            alert("리뷰 내용을 입력해주세요.");
            return;
        }
        if (!watchedAt) {
            alert("관람 일자를 선택해주세요.");
            return;
        }
        if (rating < 0.5 || rating > 5) {
            alert("별점을 선택해주세요.");
            return;
        }

        try {
            const payload = {
                movieId: movie?.id,
                content,
                rating,
                watchedAt:
                    watchedAt instanceof Date
                        ? format(watchedAt, "yyyy-MM-dd")
                        : null,
                spoilerType,
            };
            if (isEditMode && reviewId) {
                await axios.put(`/api/review/${reviewId}`, payload);
                alert("리뷰가 수정되었습니다.");
            } else {
                await axios.post("/api/review", payload);
                alert("리뷰가 등록되었습니다.");
            }
            // await axios.post("http://localhost:8080", payload);
            navigate(-1); // 홈으로 이동
        } catch (err) {
            console.error("리뷰 등록 실패:", err);
            alert("리뷰 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex justify-center">
            <div className="max-w-screen-lg w-full">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center pt-20 py-36 pb-6">
                        <h1 className="text-white text-3xl font-semibold text-left">
                            {isEditMode ? "리뷰 수정" : "리뷰 작성"}
                        </h1>
                        <Button
                            text={isEditMode ? "수정하기" : "등록하기"}
                            textColor="white"
                            buttonColor="default"
                            onClick={handleSubmit}
                            className="px-12"
                        />
                    </div>
                    <div className="flex gap-10 text-white">
                        <img
                            src={SamplePoster}
                            alt="인사이드 아웃"
                            className="w-20 object-contain"
                        />
                        <div className="flex flex-col justify-center">
                            <h1 className="text-4xl font-normal">
                                인사이드 아웃
                            </h1>
                            <div className="mt-2 font-light text-sm text-grey_200">
                                애니메이션 · 2015
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 my-6 flex-wrap">
                        {/* 관람일 */}
                        <TransparentBox
                            className="flex justify-center text-white font-light text-xs gap-2 items-center"
                            padding="px-4 py-3"
                        >
                            <span>관람 일자</span>
                            <span>|</span>
                            <div
                                className="flex justify-center items-center cursor-pointer"
                                onClick={openCalendar}
                            >
                                <CalendarIcon className="w-4 h-4 me-2" />
                                <DatePicker
                                    popperClassName="z-[9999]"
                                    portalId="root-portal"
                                    ref={datePickerRef}
                                    selected={watchedAt}
                                    onChange={(date: Date | null) =>
                                        setWatchedAt(date)
                                    }
                                    showYearDropdown
                                    showMonthDropdown
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                    placeholderText="YYYY-MM-DD"
                                    dateFormat="yyyy-MM-dd"
                                    className="cursor-pointer bg-transparent text-white placeholder-white outline-none rounded"
                                />
                            </div>
                        </TransparentBox>
                        <TransparentBox className="text-white text-xs py-2 px-4 flex justify-center items-center">
                            <StarRating
                                value={rating}
                                onChange={(value) => setRating(value)}
                                readOnly={false}
                                showOneStar={false}
                                showValue={false}
                                size={"medium"}
                            />
                        </TransparentBox>
                        <TransparentBox className="text-white text-xs py-2 px-4 gap-2 flex justify-between items-center">
                            <span>스포일러 포함</span>
                            <button
                                onClick={() => setSpoilerType(!spoilerType)}
                                className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ${
                                    spoilerType
                                        ? "bg-movie_sub"
                                        : "bg-box_bg_white"
                                }`}
                            >
                                <div
                                    className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${
                                        spoilerType
                                            ? "translate-x-4"
                                            : "translate-x-0"
                                    }`}
                                />
                            </button>
                        </TransparentBox>
                    </div>
                    <textarea
                        placeholder="리뷰 내용을 입력하세요"
                        className="bg-box_bg_white h-[400px] text-white text-xs w-full p-4 outline-none focus:ring-1 focus:ring-movie_sub rounded-3xl"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewWrite;
