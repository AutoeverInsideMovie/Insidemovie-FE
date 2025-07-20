import React, { useEffect, useState } from "react";
import StarRating from "../../../components/StarRating";
import joyIcon from "@assets/character/joy_icon.png";
import sadIcon from "@assets/character/sad_icon.png";
import angryIcon from "@assets/character/angry_icon.png";
import fearIcon from "@assets/character/fear_icon.png";
import disgustIcon from "@assets/character/disgust_icon.png";
import bingbongIcon from "@assets/character/bingbong_icon.png";
import { movieApi } from "../../../api/movieApi";
import type { MovieOne } from "../../../interfaces/movieOne";
import type { Review } from "../../../interfaces/review";
import Button from "../../../components/Button";
import ReviewItem from "../../../components/ReviewItem";
import { useNavigate, useParams } from "react-router-dom";
import MyReviewItem from "../../../components/MyReviewItem";
import Like from "@assets/like.svg?react";
import Unlike from "@assets/unlike.svg?react";

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
    const { movieId } = useParams<{ movieId: string }>();
    const movieIdNumber = Number(movieId);
    const navigate = useNavigate();
    const [movieInfo, setMovieInfo] = useState<MovieOne | null>(null);
    const [reviewList, setReviewList] = useState<Review[]>([]);
    // 감정평가 API 결과 저장
    const [emotionStats, setEmotionStats] = useState<{
        joy: number;
        anger: number;
        sadness: number;
        fear: number;
        disgust: number;
        dominantEmotion: string;
    } | null>(null);
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
                // 영화 상세 조회
                const detailRes = await movieApi().getMovieDetail({
                    movieId: movieIdNumber,
                });
                setMovieInfo(detailRes.data.data);
                // 영화 감정 조회
                const emotionRes = await movieApi().getMovieEmotions({
                    movieId: movieIdNumber,
                });
                setEmotionStats(emotionRes.data.data);
                // 리뷰 목록 조회 remains unchanged (mock or implement API)
                /*const reviewRes = (await movieApi().getMovieReviews)
                    ? await movieApi().getMovieReviews({
                          movieId: movieIdNumber,
                      })
                    : await Promise.resolve({ data: { data: [] } });*/
                //setReviewList(reviewRes.data.data);
            } catch (e) {
                console.error("영화 상세 정보 조회 에러: ", e);
            }
        })();
    }, [movieIdNumber]);

    // 좋아요/취소 토글 핸들러
    const handleLikeClick = async () => {
        if (!movieInfo) return;
        try {
            if (movieInfo.isLike) {
                await movieApi().likeMovie({ movieId: movieIdNumber });
            } else {
                await movieApi().likeMovie({ movieId: movieIdNumber });
            }
            // 로컬 state 토글
            setMovieInfo((prev) =>
                prev ? { ...prev, isLike: !prev.isLike } : prev,
            );
        } catch (e) {
            console.error("좋아요 토글 실패:", e);
        }
    };

    // 데이터 로딩 전에는 아무것도 렌더링하지 않음
    if (!movieInfo) {
        return (
            <div className="w-full h-full flex justify-center items-center text-white">
                로딩 중...
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="absolute -top-[100px] left-0 w-full h-[840px] z-10">
                <img
                    src={movieInfo.backdropPath}
                    alt="backdrop"
                    className="w-full h-full object-cover opacity-50 blur-xs"
                    style={{
                        WebkitMaskImage:
                            "linear-gradient(to top, transparent 0%, black 100%)",
                        maskImage:
                            "linear-gradient(to top, transparent 0%, black 100%)",
                    }}
                />
            </div>
            <div className="flex justify-center relative z-10 pt-96">
                <div className="max-w-screen-lg w-full">
                    {/* 상단: 포스터 + 정보 */}
                    <div className="flex gap-10 text-white">
                        <img
                            src={movieInfo.posterPath}
                            alt={movieInfo.title}
                            className="w-52 h-fit rounded-md"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-4xl font-normal">
                                    {movieInfo.title}
                                </h1>
                                <button
                                    className="ml-1 p-2 hover:bg-box_bg_white rounded-full transition-all duration-300"
                                    onClick={handleLikeClick}
                                >
                                    {movieInfo.isLike ? <Like /> : <Unlike />}
                                </button>
                            </div>
                            <div className="mt-2 font-light text-sm text-grey_200 mb-2">
                                {movieInfo.titleEn}
                            </div>
                            <StarRating
                                value={movieInfo.voteAverage}
                                readOnly={true}
                                showValue={true}
                            />
                            <div className="mt-3 space-y-1 text-sm text-gray-300">
                                <p>개봉일 : {movieInfo.releaseDate}</p>
                                <p>상영 시간 : {movieInfo.runtime}분</p>
                                <p>
                                    장르 :{" "}
                                    {movieInfo.genre.length > 0
                                        ? movieInfo.genre.join(", ")
                                        : "장르 정보 없음"}
                                </p>
                                <p>
                                    언어 :{" "}
                                    {movieInfo.originalLanguage.toUpperCase()}
                                </p>
                                <p>
                                    감독 :{" "}
                                    {movieInfo.director.length > 0
                                        ? movieInfo.director.join(", ")
                                        : "감독 정보 없음"}
                                </p>
                                <p
                                    className="mt-1 text-sm text-gray-300 overflow-hidden"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 5,
                                        WebkitBoxOrient: "vertical",
                                    }}
                                >
                                    배우 :{" "}
                                    {movieInfo.actors.length > 0
                                        ? movieInfo.actors.join(", ")
                                        : "배우 정보 없음"}
                                </p>
                            </div>
                        </div>
                        {/*<img src={Background} className={"w-[80px]"} />*/}
                    </div>

                    {/* 감정 평가 & 시놉시스 */}
                    <div className="flex gap-10 mt-10">
                        <div className="flex-1 bg-box_bg_white p-6 rounded-3xl">
                            <div className="flex items-center mb-4 text-white">
                                <h2 className="text-3xl  font-bold">
                                    감정 평가
                                </h2>
                                <p className="font-light text-xs ml-2">
                                    | 사용자의 리뷰를 바탕으로 제작되었습니다.
                                </p>
                            </div>

                            {/* 감정 바: API 결과 사용 */}
                            {emotionStats &&
                                [
                                    { icon: "joy", value: emotionStats.joy },
                                    {
                                        icon: "angry",
                                        value: emotionStats.anger,
                                    },
                                    {
                                        icon: "sad",
                                        value: emotionStats.sadness,
                                    },
                                    { icon: "fear", value: emotionStats.fear },
                                    {
                                        icon: "disgust",
                                        value: emotionStats.disgust,
                                    },
                                    // optional: use dominantEmotion if you have it
                                ].map((e, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-1 mb-2"
                                    >
                                        <img
                                            src={emotionMap[e.icon]}
                                            alt={e.icon}
                                            className="w-10 h-10"
                                        />
                                        <div className="w-full h-2 rounded-full bg-box_bg_white overflow-hidden">
                                            <div
                                                className={`${emotionColorMap[e.icon]} h-full rounded-full`}
                                                style={{
                                                    width: `${Math.round(e.value * 100)}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="ml-2 w-12 text-sm text-white">
                                            {Math.round(e.value * 100)}%
                                        </span>
                                    </div>
                                ))}
                        </div>
                        <div className="flex-1 bg-box_bg_white p-6 rounded-3xl text-white">
                            <h2 className="text-3xl  font-bold">시놉시스</h2>
                            <p className="text-sm text-gray-300 leading-relaxed mt-5">
                                {movieInfo.overview}
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
                    {!isLogin && reviewList.length > 0 && (
                        <MyReviewItem
                            reviewId={reviewList[0].reviewId}
                            content={reviewList[0].content}
                            rating={reviewList[0].rating}
                            spoiler={false}
                            createdAt={reviewList[0].createdAt}
                            likeCount={reviewList[0].likeCount}
                            myReview={reviewList[0].myReview}
                            modify={reviewList[0].modify}
                            myLike={reviewList[0].myLike}
                            nickname={reviewList[0].nickname}
                            memberId={reviewList[0].memberId}
                            movieId={reviewList[0].movieId}
                            profile={reviewList[0].profile}
                            emotions={reviewList[0].emotions}
                            isReported={reviewList[0].isReported}
                            isConcealed={reviewList[0].isConcealed}
                            isMypage={false}
                        />
                    )}

                    {/* 리뷰 목록 */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-semibold text-white mb-6">
                            리뷰
                        </h2>
                        {reviewList.map((review) => (
                            <ReviewItem
                                reviewId={review.reviewId}
                                content={review.content}
                                rating={review.rating}
                                spoiler={false}
                                createdAt={review.createdAt}
                                likeCount={review.likeCount}
                                myReview={review.myReview}
                                modify={review.modify}
                                myLike={review.myLike}
                                nickname={review.nickname}
                                memberId={review.memberId}
                                movieId={review.movieId}
                                profile={review.profile}
                                emotions={review.emotions}
                                isReported={review.isReported}
                                isConcealed={review.isConcealed}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MovieDetail;
