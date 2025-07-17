import React, { useEffect, useState } from "react";
import SamplePoster from "@assets/sample_poster.png";
import StarRating from "../components/StarRating";
import joyIcon from "@assets/character/joy_icon.png";
import sadIcon from "@assets/character/sad_icon.png";
import angryIcon from "@assets/character/angry_icon.png";
import fearIcon from "@assets/character/fear_icon.png";
import disgustIcon from "@assets/character/disgust_icon.png";
import bingbongIcon from "@assets/character/bingbong_icon.png";
import Like from "@assets/like.svg?react";
import Unlike from "@assets/unlike.svg?react";
import Edit from "@assets/edit.svg?react";
import Delete from "@assets/delete.svg?react";
import axios from "axios";
import type { MovieOne } from "../interfaces/movieOne";
import type { Review } from "../interfaces/review";
import Button from "../components/Button";
import ReviewItem from "../components/ReviewItem";
import { useNavigate } from "react-router-dom";
import Profile from "@assets/profile/joy_profile.png";

interface ReviewItemProps {
    review_id: number;
    user_profile: string;
    user_name: string;
    date: string;
    content: string;
    like_count: number;
    star_value: number;
    spoiler: true;
    emotions: {
        icon: "joy" | "sad" | "angry" | "fear" | "disgust" | "bingbong";
        value: number;
    }[];
}

const emotionMap = {
    joy: joyIcon,
    sad: sadIcon,
    angry: angryIcon,
    fear: fearIcon,
    disgust: disgustIcon,
    bingbong: bingbongIcon,
};

const emotionColorMap = {
    joy: "bg-joy_yellow",
    sad: "bg-sad_blue",
    angry: "bg-angry_red",
    fear: "bg-fear_purple",
    disgust: "bg-disgust_green",
    bingbong: "bg-bingbong_pink",
};

const MovieDetail: React.FC = () => {
    const navigate = useNavigate();
    const [movieInfo, setMovieInfo] = useState<MovieOne | null>(null);
    const [reviewList, setReviewList] = useState<Review[]>([]);
    const isLogin = false;

    const getTopEmotionIcon = (emotions: ReviewItemProps["emotions"]) => {
        if (!emotions || emotions.length === 0) return null;

        const topEmotion = emotions.reduce((prev, curr) =>
            curr.value > prev.value ? curr : prev,
        );

        return topEmotion.icon;
    };

    const sampleEmotions: {
        icon: "joy" | "sad" | "angry" | "fear" | "disgust" | "bingbong";
        value: number;
    }[] = [
        { icon: "joy", value: 35 },
        { icon: "sad", value: 15 },
        { icon: "angry", value: 10 },
        { icon: "fear", value: 25 },
        { icon: "disgust", value: 10 },
        { icon: "bingbong", value: 5 },
    ];
    const topEmotionIcon = getTopEmotionIcon(sampleEmotions);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/mock/movieDetail.json");
                setMovieInfo(res.data);
                console.log(res.data);

                const reviewList = await axios.get("/mock/review.json");
                setReviewList(reviewList.data);
                console.log(reviewList.data);
            } catch (e) {
                console.error("박스오피스 조회 에러!! : ", e);
            }
        })();
    }, []);

    return (
        <div className="flex justify-center">
            <div className="max-w-screen-lg w-full pt-10">
                {/* 상단: 포스터 + 정보 */}
                <div className="flex gap-10 text-white">
                    <img
                        src={SamplePoster}
                        alt="인사이드 아웃"
                        className="w-52 rounded-md"
                    />
                    <div>
                        <h1 className="text-4xl font-normal">인사이드 아웃</h1>
                        <div className="mt-2 font-light text-sm text-grey_200">
                            애니메이션 · 2015
                        </div>
                        <StarRating
                            value={4.5}
                            readOnly={true}
                            showValue={true}
                        />
                        <div className="mt-3 space-y-1 text-sm text-gray-300">
                            <p>개봉일: 2015-07-09</p>
                            <p>국가: 미국</p>
                            <p>장르: 애니메이션, 가족, 코미디</p>
                        </div>
                    </div>
                    {/*<img src={Background} className={"w-[80px]"} />*/}
                </div>

                {/* 감정 평가 & 시놉시스 */}
                <div className="flex gap-10 mt-10">
                    <div className="flex-1 bg-box_bg_white p-6 rounded-3xl">
                        <div className="flex items-center mb-4 text-white">
                            <h2 className="text-3xl  font-bold">감정 평가</h2>
                            <p className="font-light text-xs ml-2">
                                | 사용자의 리뷰를 바탕으로 제작되었습니다.
                            </p>
                        </div>

                        {/* 감정 바 예시 */}
                        {movieInfo?.emotions.map((emotion, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-1 mb-2"
                            >
                                <img
                                    src={emotionMap[emotion.icon]}
                                    alt={emotion.icon}
                                    className="w-10 h-10"
                                />
                                <div className="w-full h-2 rounded-full bg-box_bg_white overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${emotionColorMap[emotion.icon]}`}
                                        style={{ width: `${emotion.value}%` }}
                                    />
                                </div>
                                <span className="ml-2 text-sm text-white">
                                    {emotion.value}%
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 bg-box_bg_white p-6 rounded-3xl text-white">
                        <h2 className="text-3xl  font-bold">시놉시스</h2>
                        <p className="text-sm text-gray-300 leading-relaxed mt-5">
                            주인공 ‘라일리’는 평범한 11살 소녀! 어느 날 아빠의
                            직장 문제로 인해 낯선 도시 샌프란시스코로 이사를
                            오게 되고, ‘라일리’의 머릿속 감정 컨트롤 본부에서는
                            다섯 감정 ‘기쁨이’, ‘슬픔이’, ‘버럭이’, ‘까칠이’,
                            ‘소심이’가 흥분하기 시작하는데...
                        </p>
                    </div>
                </div>

                {/* 내가 쓴 리뷰 */}
                {isLogin && (
                    <div className="mt-10">
                        <h2 className="text-3xl font-semibold text-white">
                            내가 쓴 리뷰
                        </h2>
                        <div className="p-10 rounded-3xl border border-white/20 mt-6">
                            <Button
                                text="리뷰 작성 하기"
                                className="mx-auto block px-6 py-2"
                                onClick={() => {
                                    navigate("/review-write");
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* 로그인 시 작성한 리뷰 보여주기 */}
                {!isLogin && (
                    <div className="bg-box_bg_white p-4 rounded-3xl text-white mt-10">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Profile}
                                    alt="유저"
                                    className="w-8 h-8 rounded-full"
                                />
                                <div>
                                    <div className="font-normal text-sm">
                                        홍길동
                                    </div>
                                    <div className="text-xs font-light text-gray-400">
                                        1일 전
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
                                    value={4.5}
                                    readOnly={true}
                                    showOneStar={true}
                                    showValue={true}
                                    size={"small"}
                                />
                            </div>
                        </div>

                        <div className="mt-3 text-[15px] leading-relaxed">
                            <p className="px-2">"내용"</p>
                        </div>

                        <div className="w-full h-[1px] bg-white/10 mt-4" />

                        <div className="mt-4 flex justify-start items-center text-sm text-gray-300">
                            <div className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer">
                                <Unlike className="w-5 h-5" />
                                12{/*{like_count}*/}
                            </div>
                            <div
                                className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer"
                                onClick={() => {
                                    navigate("/review-write");
                                }}
                            >
                                <Edit className="w-5 h-5" />
                                수정하기
                            </div>
                            <div className="flex items-center gap-1 hover:bg-box_bg_white rounded-full px-2 py-1 transition-all duration-200 cursor-pointer">
                                <Delete className="w-5 h-5" />
                                삭제하기
                            </div>
                        </div>
                    </div>
                )}

                {/* 리뷰 목록 */}
                <div className="mt-12">
                    <h2 className="text-3xl font-semibold text-white mb-6">
                        리뷰
                    </h2>
                    {reviewList.map((review) => (
                        <ReviewItem
                            user_name={review.user_name}
                            date={review.date}
                            content={review.content}
                            like_count={review.like_count}
                            star_value={review.star_value}
                            spoiler={review.spoiler}
                            review_id={review.review_id}
                            user_profile={review.user_profile}
                            emotions={review.emotions}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default MovieDetail;
