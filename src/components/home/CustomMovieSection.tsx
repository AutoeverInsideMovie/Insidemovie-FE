import * as React from "react";
import Poster from "../Poster";
import type { Movie } from "../../interfaces/Movie";
import { useEffect, useState } from "react";
import axios from "axios";

interface CustomMovieSectionProps {
    className?: string;
}

const CustomMovieSection: React.FC<CustomMovieSectionProps> = ({
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
            <h1 className="text-xl font-extralight mb-4 text-white">
                맞춤 영화
            </h1>
            <div className="flex gap-6 overflow-x-hidden scrollbar-hide px-2">
                {movieList.map((movie, idx) => (
                    <Poster
                        key={idx}
                        posterImg={movie.posterImg}
                        posterName={movie.posterName}
                        emotionIcon={movie.emotionIcon}
                        emotionValue={movie.emotionValue}
                        starValue={movie.starValue}
                    />
                ))}
            </div>
        </section>
    );
};

export default CustomMovieSection;
