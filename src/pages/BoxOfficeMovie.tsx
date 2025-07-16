import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import type { BoxOffice } from "../interfaces/BoxOffice";
import Poster from "@assets/sample_poster.png";
import BoxOfficeItem from "../components/BoxOfficeItem";
import { useNavigate } from "react-router-dom";

const BoxOfficeMovie: React.FC = () => {
    const navigate = useNavigate();
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
        <div>
            <div className="flex justify-center">
                <div className="max-w-screen-lg w-full">
                    <div className="flex flex-col">
                        <div className="pt-10 py-36">
                            <h1 className="text-white text-3xl font-semibold pb-6 text-left">
                                박스오피스 순위 top100
                            </h1>
                            {movieList.map((movie) => (
                                <BoxOfficeItem
                                    rank={movie.rank}
                                    posterImg={Poster}
                                    posterName={movie.posterName}
                                    starValue={movie.starValue}
                                    emotions={movie.emotions}
                                    onClick={() => navigate("/movie")}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxOfficeMovie;
