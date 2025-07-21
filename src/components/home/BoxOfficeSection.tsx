import * as React from "react";
import ArrowRight from "@assets/arrow_right.svg?react";
import { useEffect, useState } from "react";
import BoxOfficeItem from "../BoxOfficeItem";
import SamplePoster from "@assets/sample_poster.png";
import type { boxOffice } from "../../interfaces/boxOffice";
import { useNavigate } from "react-router-dom";
import { boxofficeApi } from "../../api/boxofficeApi";

interface CustomBoxOfficeSectionProps {
    className?: string;
}

const BoxOfficeSection: React.FC<CustomBoxOfficeSectionProps> = ({
    className = "",
}) => {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState<boxOffice[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await boxofficeApi().getDailyBoxOffice();
                setMovieList(res.data.data.items);
            } catch (e) {
                console.error("박스오피스 영화 조회 에러!! : ", e);
            }
        })();
    }, []);

    return (
        <section className={`w-full ${className}`}>
            <h1
                onClick={() => navigate("/boxoffice")}
                className="inline-flex items-center gap-2 cursor-pointer text-xl font-semibold mb-4 text-white transform transition-transform duration-200 hover:scale-105"
            >
                박스오피스 순위
                <ArrowRight />
            </h1>
            <div className="flex flex-col gap-3 overflow-x-hidden scrollbar-hide px-2">
                {movieList.slice(0, 3).map((movie, idx) => (
                    <BoxOfficeItem
                        key={idx}
                        id={movie.movieId}
                        rank={movie.base.rank}
                        posterImg={movie.posterPath}
                        posterName={movie.title}
                        starValue={movie.voteAverage}
                        mainEmotion={movie.mainEmotion}
                        mainEmotionValue={movie.mainEmotionValue}
                    />
                ))}
            </div>
        </section>
    );
};

export default BoxOfficeSection;
