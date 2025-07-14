import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TransparentBox from "../components/TransparentBox";

import samplePoster from "../assets/sample_poster.png";

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
                        <div className="py-[240px]">
                            <h1 className="text-white text-2xl font-semibold pb-6 text-left">
                                박스오피스 순위 top100
                            </h1>
                            <div className="flex flex-row pb-6">
                                <div className="text-4xl font-bold pl-8 first-line: pr-4 text-white">
                                    1
                                </div>
                                <TransparentBox className="w-full h-[150px] p-0 overflow-hidden flex flex-row">
                                    <img
                                        src={samplePoster}
                                        alt="포스터"
                                        className="h-full object-contain"
                                    />
                                    
                                    <div className="p-4 flex flex-col justify-between">
                                        <h1 className=" text-2xl font-semibold text-white ">
                                          인사이드 아웃
                                        </h1>
                                        <div className="text-white">
                                          ⭐⭐⭐⭐⭐ 5.0
                                        </div>
                                        <div className="flex flex-row text-white">
                                          (감정 파라미터)
                                        </div>
                                    </div>
                                </TransparentBox>
                            </div>
                            <div className="flex flex-row pb-6">
                                <div className="text-4xl font-bold pl-8 first-line: pr-4 text-white">
                                    2
                                </div>
                                <TransparentBox className="w-full h-[150px] p-0 overflow-hidden flex flex-row">
                                    <img
                                        src={samplePoster}
                                        alt="포스터"
                                        className="h-full object-contain"
                                    />
                                    
                                    <div className="p-4 flex flex-col justify-between">
                                        <h1 className=" text-2xl font-sebold text-white ">
                                          인사이드 아웃
                                        </h1>
                                        <div className="text-white">
                                          ⭐⭐⭐⭐⭐ 5.0
                                        </div>
                                        <div className="flex flex-row text-white">
                                          (감정 파라미터)
                                        </div>
                                    </div>
                                </TransparentBox>
                            </div>
                            <div className="flex flex-row pb-6">
                                <div className="text-4xl font-bold pl-8 first-line: pr-4 text-white">
                                    3
                                </div>
                                <TransparentBox className="w-full h-[150px] p-0 overflow-hidden flex flex-row">
                                    <img
                                        src={samplePoster}
                                        alt="포스터"
                                        className="h-full object-contain"
                                    />
                                    
                                    <div className="p-4 flex flex-col justify-between">
                                        <h1 className=" text-2xl font-bold text-white ">
                                          인사이드 아웃
                                        </h1>
                                        <div className="text-white">
                                          ⭐⭐⭐⭐⭐ 5.0
                                        </div>
                                        <div className="flex flex-row text-white">
                                          (감정 파라미터)
                                        </div>
                                    </div>
                                </TransparentBox>
                            </div>
                            <div className="flex flex-row pb-6">
                                <div className="text-4xl font-bold pl-8 first-line: pr-4 text-white">
                                    4
                                </div>
                                <TransparentBox className="w-full h-[150px] p-0 overflow-hidden flex flex-row">
                                    <img
                                        src={samplePoster}
                                        alt="포스터"
                                        className="h-full object-contain"
                                    />
                                    
                                    <div className="p-4 flex flex-col justify-between">
                                        <h1 className=" text-2xl font-bold text-white ">
                                          인사이드 아웃
                                        </h1>
                                        <div className="text-white">
                                          ⭐⭐⭐⭐⭐ 5.0
                                        </div>
                                        <div className="flex flex-row text-white">
                                          (감정 파라미터)
                                        </div>
                                    </div>
                                </TransparentBox>
                            </div>
                            <div className="flex flex-row pb-6">
                                <div className="text-4xl font-bold pl-8 first-line: pr-4 text-white">
                                    5
                                </div>
                                <TransparentBox className="w-full h-[150px] p-0 overflow-hidden flex flex-row">
                                    <img
                                        src={samplePoster}
                                        alt="포스터"
                                        className="h-full object-contain"
                                    />
                                    
                                    <div className="p-4 flex flex-col justify-between">
                                        <h1 className=" text-2xl font-bold text-white ">
                                          인사이드 아웃
                                        </h1>
                                        <div className="text-white">
                                          ⭐⭐⭐⭐⭐ 5.0
                                        </div>
                                        <div className="flex flex-row text-white">
                                          (감정 파라미터)
                                        </div>
                                    </div>
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
