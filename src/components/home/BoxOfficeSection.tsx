import * as React from "react";
import Poster from "../Poster";
import ArrowRight from "../../assets/arrow_right.svg?react";
import { useEffect, useState } from "react";
import type { Movie } from "../../interfaces/Movie";
import axios from "axios";

interface CustomBoxOfficeSectionProps {
    className?: string;
}

const BoxOfficeSection: React.FC<CustomBoxOfficeSectionProps> = ({
    className = "",
}) => {
    const [movieList, setMovieList] = useState<Movie[]>([]);

    useEffect(() => {
        const getBoxOffice = async () => {
            try {
                const res = await axios.get("/mock/movie.json");
                setMovieList(res.data);
                console.log(res.data);
            } catch (e) {
                console.error("맞춤 영화 조회 에러!! : ", e);
            }
        };
        getBoxOffice();
    }, []);

    return (
        <section className={`w-full ${className}`}>
            <h1 className="flex items-center gap-2 text-xl font-extralight mb-4 text-white">
                빅스오피스 순위
                <ArrowRight />
            </h1>
            <div className="flex gap-6 overflow-x-hidden scrollbar-hide px-2">
                {movieList.map((poster, idx) => (
                    <Poster
                        key={idx}
                        posterImg={poster.posterImg}
                        posterName={poster.posterName}
                        emotionIcon={poster.emotionIcon}
                        emotionValue={poster.emotionValue}
                        starValue={poster.starValue}
                    />
                ))}
            </div>
        </section>
    );
};

export default BoxOfficeSection;
