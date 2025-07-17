import * as React from "react";
import Poster from "../Poster";
import ArrowRight from "@assets/arrow_right.svg?react";
import { useEffect, useState } from "react";
import type { Winner } from "../../interfaces/winner";
import axios from "axios";
import SamplePoster from "@assets/sample_poster.png";
import WinnerItem from "../WinnerItem";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

interface MatchSectionProps {
    className?: string;
}

const MatchSection: React.FC<MatchSectionProps> = ({ className = "" }) => {
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
        <section className={`w-full ${className}`}>
            <h1
                onClick={() => navigate("/weekmatch")}
                className="inline-flex items-center gap-2 cursor-pointer text-xl font-semibold mb-4 text-white transform transition-transform duration-200 hover:scale-105"
            >
                금주의 영화 대결
                <ArrowRight />
            </h1>
            <div className="flex w-full justify-between gap-10">
                <div>
                    <div className="flex justify-between items-center">
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
                        className="w-full"
                        text="투표하러 가기"
                        textColor="black"
                        buttonColor="white"
                        onClick={() => navigate("/weekmatch")}
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <h1 className="flex items-center gap-2 text-lg font-semibold mb-4 text-white">
                        역대 우승 영화
                    </h1>
                    <div className="flex flex-col items-center justify-center px-2 py-1">
                        {movieList.splice(0, 2).map((movie, i) => (
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
        </section>
    );
};

export default MatchSection;
