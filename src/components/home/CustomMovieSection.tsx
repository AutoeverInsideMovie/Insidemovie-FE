import * as React from "react";
import Poster from "../Poster";
import type { Movie } from "../../interfaces/movie";
import { useEffect, useState } from "react";
import axios from "axios";
import SamplePoster from "@assets/sample_poster.png";
import { useNavigate } from "react-router-dom";

interface CustomMovieSectionProps {
    className?: string;
}

const CustomMovieSection: React.FC<CustomMovieSectionProps> = ({
    className = "",
}) => {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState<Movie[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/mock/movie.json");
                setMovieList(res.data);
            } catch (e) {
                console.error("맞춤 영화 조회 에러!! : ", e);
            }
        })();
    }, []);

    return (
        <section className={`w-full ${className}`}>
            <h1 className="text-xl font-semibold mb-4 text-white">맞춤 영화</h1>
            <div className="flex gap-3 overflow-x-hidden scrollbar-hide px-2">
                {movieList.splice(0, 5).map((movie, idx) => (
                    <Poster
                        key={idx}
                        posterImg={SamplePoster}
                        posterName={movie.posterName}
                        emotionIcon={movie.emotionIcon}
                        emotionValue={movie.emotionValue}
                        starValue={movie.starValue}
                        onClick={() => navigate("/movie")}
                    />
                ))}
            </div>
        </section>
    );
};

export default CustomMovieSection;
