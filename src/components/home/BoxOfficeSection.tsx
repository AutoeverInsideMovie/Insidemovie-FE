import * as React from "react";
import Poster from "../Poster";
import type { PosterProps } from "../Poster";
import ArrowRight from "../../assets/arrow_right.svg?react";
import samplePoster from "../../assets/sample_poster.png";

interface CustomBoxOfficeSectionProps {
    className?: string;
}

const BoxOfficeSection: React.FC<CustomBoxOfficeSectionProps> = ({
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
            <h1 className="flex items-center gap-2 text-xl font-extralight mb-4 text-white">
                빅스오피스 순위
                <ArrowRight />
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

export default BoxOfficeSection;
