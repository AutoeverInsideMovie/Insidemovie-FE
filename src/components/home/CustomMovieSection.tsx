import * as React from "react";
import Poster from "../Poster";
import samplePoster from "../../assets/sample_poster.png";
interface CustomMovieSectionProps {
    className?: string;
}

const CustomMovieSection: React.FC<CustomMovieSectionProps> = ({
    className = "",
}) => {
    return (
        <section className={`${className}`}>
            <h1 className="text-xl font-extralight mb-4 text-white">
                맞춤 영화
            </h1>
            <div className="flex gap-6 overflow-x-hidden scrollbar-hide">
                <Poster
                    posterImg={samplePoster}
                    posterName={"인사이드 아웃"}
                    emotionIcon={"joy"}
                    emotionValue={50}
                    starValue={40}
                />
                <Poster
                    posterImg={samplePoster}
                    posterName={"인사이드 아웃"}
                    emotionIcon={"joy"}
                    emotionValue={50}
                    starValue={40}
                />
                <Poster
                    posterImg={samplePoster}
                    posterName={"인사이드 아웃"}
                    emotionIcon={"joy"}
                    emotionValue={50}
                    starValue={40}
                />
                <Poster
                    posterImg={samplePoster}
                    posterName={"인사이드 아웃"}
                    emotionIcon={"joy"}
                    emotionValue={50}
                    starValue={40}
                />
                <Poster
                    posterImg={samplePoster}
                    posterName={"인사이드 아웃"}
                    emotionIcon={"joy"}
                    emotionValue={50}
                    starValue={40}
                />
            </div>
        </section>
    );
};

export default CustomMovieSection;
