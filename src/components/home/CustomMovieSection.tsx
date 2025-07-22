import * as React from "react";
import MovieItem from "../MovieItem";
import { useState, useEffect } from "react";
import { recommendApi } from "../../api/recommendApi";
import EmotionSection from "./EmotionSection";
import { memberApi } from "../../api/memberApi";

interface CustomMovieSectionProps {
    className?: string;
}

interface Movie {
    movieId: number;
    title: string;
    posterPath: string;
    voteAverage: number;
    dominantEmotion: string;
    dominantEmotionRatio: number;
    ratingAvg: number;
}

const CustomMovieSection: React.FC<CustomMovieSectionProps> = ({
    className = "",
}) => {
    const [recommendList, setRecommendList] = useState<Movie[]>([]);

    const handleEmotionsChange = async (
        joy: number,
        sad: number,
        angry: number,
        fear: number,
        disgust: number,
    ) => {
        try {
            // Normalize values to 0-1
            const joyNorm = joy;
            const sadNorm = sad;
            const angryNorm = angry;
            const fearNorm = fear;
            const disgustNorm = disgust;
            const res = await recommendApi().getRecommendMovie({
                joy: joyNorm,
                sadness: sadNorm,
                anger: angryNorm,
                fear: fearNorm,
                disgust: disgustNorm,
            });
            console.log(
                `requestData: joy - ${joyNorm}, sad - ${sadNorm}, angry - ${angryNorm}, fear - ${fearNorm}, disgust - ${disgustNorm}`,
            );
            setRecommendList(res.data.data);
            console.log(res.data.data);
        } catch (e) {
            console.error("맞춤 영화 추천 에러!! : ", e);
            setRecommendList([]);
        }
    };

    useEffect(() => {
        const loadEmotions = async () => {
            try {
                const res = await memberApi().getMyAverageEmotions();
                const data = res.data.data;
                // API returns decimals between 0 and 1
                const joy100 = Math.round(data.joy);
                const sad100 = Math.round(data.sadness);
                const angry100 = Math.round(data.anger);
                const fear100 = Math.round(data.fear);
                const disgust100 = Math.round(data.disgust);

                const response = await recommendApi().getRecommendMovie({
                    joy: joy100,
                    sadness: sad100,
                    anger: angry100,
                    fear: fear100,
                    disgust: disgust100,
                });
                setRecommendList(response.data.data);
            } catch {
                const response = await recommendApi().getRecommendMovie({
                    joy: 50,
                    sadness: 50,
                    anger: 50,
                    fear: 50,
                    disgust: 50,
                });
                setRecommendList(response.data.data);
            }
        };
        loadEmotions();
    }, []);

    return (
        <section className={`w-full ${className}`}>
            <EmotionSection onEmotionsChange={handleEmotionsChange} />
            <h1 className="text-xl font-semibold mb-4 text-white mt-10">
                맞춤 영화
            </h1>
            <div className="flex gap-3 overflow-x-hidden scrollbar-hide px-2">
                {recommendList.length === 0
                    ? Array.from({ length: 5 }).map((_, idx) => (
                          <div
                              key={idx}
                              className="w-[200px] h-[280px] mx-1 my-3 bg-gray-700 animate-pulse rounded-lg"
                          />
                      ))
                    : recommendList.map((movie, idx) => (
                          <MovieItem
                              key={idx}
                              movieId={movie.movieId}
                              posterImg={movie.posterPath}
                              posterName={movie.title}
                              emotionIcon={movie.dominantEmotion.toLowerCase()}
                              emotionValue={movie.dominantEmotionRatio || 0}
                              starValue={movie.voteAverage}
                              ratingAvg={movie.ratingAvg}
                          />
                      ))}
            </div>
        </section>
    );
};

export default CustomMovieSection;
