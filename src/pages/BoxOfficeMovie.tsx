import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import type { BoxOffice } from "../interfaces/BoxOffice";
import Poster from "@assets/sample_poster.png";
import BoxOfficeItem from "../components/BoxOfficeItem";

const BoxOfficeMovie: React.FC = () => {
    const [movieList, setMovieList] = useState<BoxOffice[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/mock/boxoffice.json");
                setMovieList(res.data);
                console.log(res.data);
            } catch (e) {
                console.error("박스오피스 조회 에러!! : ", e);
            }
        })();
    }, []);

    return (
        <>
            <div>
                <div className="flex justify-center">
                    <div className="max-w-screen-md w-full min-h-screen">
                        <div className="flex flex-col">
                            <div className="py-[240px]">
                                <h1 className="text-white text-2xl font-semibold pb-6 text-left">
                                    박스오피스 순위 top100
                                </h1>
                                {movieList.map((movie) => (
                                    <BoxOfficeItem
                                        rank={movie.rank}
                                        posterImg={Poster}
                                        posterName={movie.posterName}
                                        starValue={movie.starValue}
                                        emotions={movie.emotions}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BoxOfficeMovie;
