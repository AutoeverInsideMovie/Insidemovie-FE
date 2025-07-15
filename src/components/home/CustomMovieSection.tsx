import * as React from "react";
import Poster from "../Poster";
import type { PosterProps } from "../Poster";
import samplePoster from "../../assets/sample_poster.png";

interface CustomMovieSectionProps {
    className?: string;
}

const CustomMovieSection: React.FC<CustomMovieSectionProps> = ({
    className = "",
}) => {
    const posterList: PosterProps[] = Array.from({ length: 6 }, (_, i) => ({
        posterImg: samplePoster,
        posterName: `인사이드 아웃 ${i + 1}`,
        emotionIcon: "joy",
        emotionValue: 50,
        starValue: 40,
    }));

    return (
        <section className={`w-full ${className}`}>
            <h1 className="text-xl font-extralight mb-4 text-white">
                맞춤 영화
            </h1>
            <div className="flex gap-6 overflow-x-hidden scrollbar-hide px-2">
                {posterList.map((poster, idx) => (
                    <Poster
                        key={idx}
                        posterImg={poster.posterImg}
                        posterName={poster.posterName}
                        emotionIcon={poster.emotionIcon}
                        emotionValue={poster.emotionValue}
                        starValue={poster.starValue}
                    />
                ))}
            </div>
        </section>
    );
};

export default CustomMovieSection;
