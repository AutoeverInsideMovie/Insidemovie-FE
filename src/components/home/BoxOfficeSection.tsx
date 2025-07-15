import * as React from "react";
import ArrowRight from "@assets/arrow_right.svg?react";
import { useEffect, useState } from "react";
import axios from "axios";
import BoxOfficeItem from "../BoxOfficeItem";
import SamplePoster from "@assets/sample_poster.png";
import type { BoxOffice } from "../../interfaces/BoxOffice";

interface CustomBoxOfficeSectionProps {
    className?: string;
}

const BoxOfficeSection: React.FC<CustomBoxOfficeSectionProps> = ({
    className = "",
}) => {
    const [movieList, setMovieList] = useState<BoxOffice[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/mock/boxoffice.json");
                setMovieList(res.data);
                console.log(res.data);
            } catch (e) {
                console.error("맞춤 영화 조회 에러!! : ", e);
            }
        })();
    }, []);

    return (
        <section className={`w-full ${className}`}>
            <h1 className="flex items-center gap-2 text-xl font-semibold mb-4 text-white">
                박스오피스 순위
                <ArrowRight />
            </h1>
            <div className="flex flex-col gap-6 overflow-x-hidden scrollbar-hide px-2">
                {movieList.slice(0, 3).map((movie) => (
                    <BoxOfficeItem
                        rank={movie.rank}
                        posterImg={SamplePoster}
                        posterName={movie.posterName}
                        starValue={movie.starValue}
                        emotions={movie.emotions}
                    />
                ))}
            </div>
        </section>
    );
};

export default BoxOfficeSection;
