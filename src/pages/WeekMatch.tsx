import React, { useEffect, useState } from "react";
import Poster from "../components/Poster";
import SamplePoster from "@assets/sample_poster.png";
import Button from "../components/Button";
import type { Winner } from "../interfaces/winner";
import axios from "axios";
import WinnerItem from "../components/WinnerItem";
import { useNavigate } from "react-router-dom";

const WeekMatch: React.FC = () => {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState<Winner[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/mock/winner.json");
                setMovieList(res.data);
                console.log(res.data);
            } catch (e) {
                console.error("맞춤 영화 조회 에러!! : ", e);
            }
        })();
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <div className="max-w-screen-lg w-full">
                    <div className="flex flex-col pt-20">
                        <h1 className="text-center text-white text-3xl font-semibold pb-3 border-b-[1px] border-box_bg_white">
                            가장 마음에 드는 영화를 골라주세요
                        </h1>

                        <div className="flex flex-col items-center justify-center">
                            <div className="flex justify-center items-center gap-10 mt-10">
                                {movieList.slice(0, 3).map((poster, idx) => (
                                    <React.Fragment key={idx}>
                                        <Poster
                                            posterImg={SamplePoster}
                                            posterName={poster.posterName}
                                            emotionIcon={poster.emotionIcon}
                                            emotionValue={poster.emotionValue}
                                            starValue={poster.starValue}
                                            onClick={() => navigate("/movie")}
                                        />
                                        {idx < 2 && (
                                            <span className="text-white text-xl mx-2">
                                                VS
                                            </span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                            <Button
                                className="w-1/2 mt-10"
                                text="투표하러 가기"
                                textColor="white"
                                buttonColor="default"
                            />
                        </div>

                        <div className="flex flex-col flex-1 mt-20">
                            <h1 className="flex items-center gap-2 text-2xl font-semibold mb-4 text-white">
                                역대 우승 영화
                            </h1>
                            <div className="flex flex-col items-center justify-center px-2 py-1">
                                {movieList.map((movie, i) => (
                                    <WinnerItem
                                        key={i}
                                        posterImg={SamplePoster}
                                        posterName={movie.posterName}
                                        emotionIcon={movie.emotionIcon}
                                        emotionValue={movie.emotionValue}
                                        starValue={movie.starValue}
                                        winnerWeek={movie.winnerWeek}
                                        onClick={() => navigate("/movie")}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WeekMatch;
