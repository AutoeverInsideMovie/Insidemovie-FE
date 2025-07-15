import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TransparentBox from "../components/TransparentBox";
import Poster from "../assets/sample_poster.png";
import StarRating from "../components/StarRating";

interface Movie {
    id: number;
    rank: number;
    title: string;
    rating: number;
    image: string;
}

const BoxOffice: React.FC = () => {
    const [movieList, setMovieList] = useState<Movie[]>([]);

    useEffect(() => {
        const getBoxOffice = async () => {
            try {
                const res = await axios.get("/mock/boxoffice.json");
                setMovieList(res.data);
                console.log(res.data);
            } catch (e) {
                console.error("박스오피스 조회 에러!! : ", e);
            }
        };
        getBoxOffice();
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
                                    <div
                                        key={movie.id}
                                        className="flex flex-row pb-6"
                                    >
                                        <div className="text-4xl font-bold pl-8 first-line: pr-4 text-white">
                                            {movie.rank}
                                        </div>
                                        <TransparentBox className="w-full h-[150px] overflow-hidden flex flex-row p-0">
                                            <img
                                                src={Poster || movie.image}
                                                alt="포스터"
                                                className="h-full object-cover"
                                            />

                                            <div className="p-4 flex flex-col justify-between">
                                                <h1 className=" text-2xl font-semibold text-white ">
                                                    {movie.title}
                                                </h1>
                                                <div className="text-white flex flex-row">
                                                    <StarRating
                                                        rating={movie.rating}
                                                    />
                                                    <div className="w-2 h-2"></div>
                                                    {movie.rating.toFixed(1)}
                                                </div>
                                                <div className="flex flex-row text-white">
                                                    (감정 파라미터)
                                                </div>
                                            </div>
                                        </TransparentBox>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BoxOffice;
