import React from "react";
import SamplePoster from "@assets/sample_poster.png";
import Background from "@assets/movie_background.png";
import StarRating from "../components/StarRating";

const MovieDetail: React.FC = () => {
    return (
        <div className="flex justify-center">
            <div className="max-w-screen-lg w-full pt-10">
                {/* 상단: 포스터 + 정보 */}
                <div className="flex gap-10 text-white">
                    <img
                        src={SamplePoster}
                        alt="인사이드 아웃"
                        className="w-52 rounded-md"
                    />
                    <div>
                        <h1 className="text-4xl font-normal">인사이드 아웃</h1>
                        <div className="mt-2 font-light text-sm text-grey_200">
                            애니메이션 · 2015
                        </div>
                        <StarRating
                            value={4.5}
                            readOnly={true}
                            showValue={true}
                        />
                        <div className="mt-3 space-y-1 text-sm text-gray-300">
                            <p>개봉일: 2015-07-09</p>
                            <p>국가: 미국</p>
                            <p>장르: 애니메이션, 가족, 코미디</p>
                        </div>
                    </div>
                    <img src={Background} className={"w-[80px]"} />
                </div>

                {/* 감정 평가 & 시놉시스 */}
                <div className="flex gap-10 mt-10">
                    <div className="flex-1 bg-white/10 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">
                            감정 평가
                        </h2>
                        {/* 감정 바 예시 */}
                        {["기쁨", "슬픔", "버럭", "소심", "까칠"].map(
                            (emotion) => (
                                <div key={emotion} className="mb-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{emotion}</span>
                                        <span>75%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/20 rounded-full">
                                        <div className="h-2 bg-yellow-400 rounded-full w-[75%]" />
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                    <div className="flex-1 bg-white/10 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">시놉시스</h2>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            주인공 ‘라일리’는 평범한 11살 소녀! 어느 날 아빠의
                            직장 문제로 인해 낯선 도시 샌프란시스코로 이사를
                            오게 되고, ‘라일리’의 머릿속 감정 컨트롤 본부에서는
                            다섯 감정 ‘기쁨이’, ‘슬픔이’, ‘버럭이’, ‘까칠이’,
                            ‘소심이’가 흥분하기 시작하는데...
                        </p>
                    </div>
                </div>

                {/* 내가 쓴 리뷰 */}
                <div className="mt-10">
                    <h2 className="text-lg font-semibold mb-3">내가 쓴 리뷰</h2>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/20">
                        <button className="mx-auto block px-6 py-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-white">
                            리뷰 작성 하기
                        </button>
                    </div>
                </div>

                {/* 리뷰 목록 */}
                <div className="mt-12">
                    <h2 className="text-lg font-semibold mb-4">리뷰</h2>
                    {[1, 2, 3].map((id) => (
                        <div
                            key={id}
                            className="bg-white/5 p-6 rounded-xl border border-white/20 mb-5"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-sm text-gray-300">
                                    유저이름
                                </div>
                                <div className="text-sm text-yellow-400">
                                    ★ 4.5
                                </div>
                            </div>
                            <p className="text-sm text-gray-200 leading-relaxed">
                                이 영화를 보게 되면 감정들이 어떻게 작동하는지
                                생각해보게 되는...
                            </p>
                            <div className="mt-3 flex gap-5 text-sm text-gray-400">
                                <div>❤️ 12</div>
                                <div>🚨 신고하기</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default MovieDetail;
