import * as React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// 에셋
import Poster from "../assets/sample_poster.png";
import Button from "../components/Button";
import TransparentBox from "../components/TransparentBox";
// 날짜 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../assets/calendar.svg?react";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";

// 평점 라이브러리
import SelectStars from "@mui/material/Rating";

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
        const fetchMovie = async () => {
            try {
                const res = await axios.get<Movie>("/mock/movie1.json");
                setMovie(res.data);
                console.log("불러온 영화 정보 : ", res.data);
            } catch (e) {
                console.error("영화 정보 조회 에러!! : ", e);
            }
        };

        fetchMovie();
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
            console.log("전송할 데이터:", payload);
            // await axios.post("http://localhost:8080", payload);
            alert("리뷰가 등록되었습니다.");
            navigate("/"); // 홈으로 이동
        } catch (err) {
            console.error("리뷰 등록 실패:", err);
            alert("리뷰 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="max-w-screen-md w-full min-h-screen">
                    <div className="flex flex-col py-[200px]">
                        <div className="flex justify-between">
                            <h1 className="text-white text-2xl font-semibold text-left">
                                리뷰 작성
                            </h1>
                            <Button
                                text={"등록하기"}
                                textColor="white"
                                buttonColor="default"
                                onClick={handleSubmit}
                                className="px-14"
                            />
                        </div>
                        <div className="flex items-center gap-4 w-full my-6 ">
                            <img
                                src={Poster || movie?.image}
                                alt="포스터"
                                className="w-16 h-24"
                            />
                            <div className="flex flex-col justify-center gap-2 pl-2">
                                <h3 className="text-4xl font-normal text-white">
                                    {movie?.title}
                                </h3>
                                <p className="text-xs text-white">
                                    {movie?.genre}, {movie?.releaseYear}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 my-6 flex-wrap">
                            {/* 관람일 */}
                            <TransparentBox className="flex justify-between h-[40px] text-white text-xs p-2 px-4 gap-2 items-center">
                                <span>관람 일자</span>
                                <span>|</span>
                                <div className="flex justify-center items-center cursor-pointer">
                                    <CalendarIcon
                                        className="w-4 h-4"
                                        onClick={openCalendar}
                                    />
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
                                        className="w-[94px] bg-transparent text-white placeholder-white outline-none px-2 py-1 rounded"
                                    />
                                </div>
                            </TransparentBox>
                            <TransparentBox className="h-[40px] text-white text-xs p-2 px-4 flex justify-center items-center">
                                {/* 변경 예정 */}
                                <SelectStars
                                    name="half-rating"
                                    precision={0.5}
                                    size="small"
                                />
                            </TransparentBox>

                            <TransparentBox className="h-[40px] text-white text-xs p-2 px-4 gap-2 flex justify-between items-center">
                                <span>스포일러 포함</span>
                                <button
                                    onClick={() => setSpoilerType(!spoilerType)}
                                    className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ${
                                        spoilerType
                                            ? "bg-movie_sub"
                                            : "bg-grey_200"
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
                        <TransparentBox className="h-[400px] text-white text-xs p-4 flex">
                            <textarea
                                placeholder="리뷰 내용을 입력하세요"
                                className="bg-transparent text-white w-full h-full p-4 outline-none focus:ring-1 focus:ring-movie_sub rounded"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </TransparentBox>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewWrite;
