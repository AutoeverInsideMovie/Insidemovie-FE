import * as React from "react";
import MovieItem from "../MovieItem";
import { useState } from "react";
import { recommendApi } from "../../api/recommendApi";
import EmotionSection from "./EmotionSection";

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
            const joyNorm = joy / 100;
            const sadNorm = sad / 100;
            const angryNorm = angry / 100;
            const fearNorm = fear / 100;
            const disgustNorm = disgust / 100;
            const res = await recommendApi().getRecommendMovie({
                joy: joyNorm,
                sadness: sadNorm,
                anger: angryNorm,
                fear: fearNorm,
                neutral: disgustNorm,
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
    return (
        <section className={`w-full ${className}`}>
            <EmotionSection onEmotionsChange={handleEmotionsChange} />
            <h1 className="text-xl font-semibold mb-4 text-white mt-10">
                맞춤 영화
            </h1>
            <div className="flex gap-3 overflow-x-hidden scrollbar-hide px-2">
                {recommendList.map((movie, idx) => (
                    <MovieItem
                        key={idx}
                        movieId={movie.movieId}
                        posterImg={movie.posterPath}
                        posterName={movie.title}
                        emotionIcon={movie.dominantEmotion.toLowerCase()}
                        emotionValue={movie.dominantEmotionRatio * 100 || 0}
                        starValue={movie.voteAverage}
                    />
                ))}
            </div>
        </section>
    );
};

export default CustomMovieSection;
