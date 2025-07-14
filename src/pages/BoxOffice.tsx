import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TransparentBox from "../components/TransparentBox";

const BoxOffice: React.FC = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        const getBoxOffice = async () => {
            try {
                const res = await axios.get("../mock/boxoffice.json");
                setMovieList(res.data);
            } catch (e) {
                console.error("박스오피스 조회 에러!! : ", e);
            }
        };
    }, []);

    return (
        <>
            <div className="flex justify-center">
                <div className="max-w-screen-md w-full min-h-screen">
                    <div className="flex flex-col">
                        <div className="py-[360px]">
                            <h2 className="text-white text-base font-semibold pb-6 text-left">
                                박스오피스 순위 top100
                            </h2>
                            <div className="flex flex-row pb-6">
                                <div className="text-4xl font-bold pl-8 first-line: pr-4 text-white">
                                    1
                                </div>
                                <TransparentBox className="w-full h-[150px]">
                                    <img
                                        src="/assets/sample_poster.png?react"
                                        alt="포스터"
                                    />
                                </TransparentBox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BoxOffice;
