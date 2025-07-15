import * as React from "react";
import ArrowRight from "../../assets/arrow_right.svg?react";
import Poster from "../Poster";
import Tag from "../Tag";
import { useEffect, useState } from "react";
import type { Movie } from "../../interfaces/Movie";
import axios from "axios";

interface RecommendMovieSectionProps {
    className?: string;
}

const RecommendMovieSection: React.FC<RecommendMovieSectionProps> = ({
    className = "",
}) => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);

    React.useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        const updateScroll = () => {
            setCanScrollLeft(scrollElement.scrollLeft > 0);
            setCanScrollRight(
                scrollElement.scrollLeft + scrollElement.clientWidth <
                    scrollElement.scrollWidth,
            );
        };

        scrollElement.addEventListener("scroll", updateScroll);
        updateScroll();

        return () => scrollElement.removeEventListener("scroll", updateScroll);
    }, []);

    const tagList = ["hello", "ㄷㄷ", "태그", "스포츠", "안녕"];
    const [movieList, setMovieList] = useState<Movie[]>([]);

    useEffect(() => {
        const getBoxOffice = async () => {
            try {
                const res = await axios.get("/mock/movie.json");
                setMovieList(res.data);
                console.log(res.data);
            } catch (e) {
                console.error("맞춤 영화 조회 에러!! : ", e);
            }
        };
        getBoxOffice();
    }, []);

    const handleTagClick = (label: string) => {
        setSelectedTags((prev) =>
            prev.includes(label)
                ? prev.filter((t) => t !== label)
                : [...prev, label],
        );
    };

    return (
        <section className={`w-full ${className}`}>
            <h1 className="flex items-center gap-2 text-xl font-extralight mb-4 text-white">
                추천 영화
                <ArrowRight />
            </h1>
            <div className="flex items-center mb-4">
                {tagList.map((tag) => (
                    <Tag
                        key={tag}
                        label={tag}
                        selected={selectedTags.includes(tag)}
                        onClick={handleTagClick}
                    />
                ))}
            </div>
            <div className="relative w-full">
                <div
                    ref={scrollRef}
                    className="w-full overflow-x-auto scrollbar-hide"
                >
                    <div className="flex gap-6 w-max px-2">
                        {movieList.map((poster, idx) => (
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
                </div>

                {/* Left Fade + Arrow */}
                {canScrollLeft && (
                    <>
                        <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-[#081232] to-transparent" />
                        <button
                            onClick={() =>
                                scrollRef.current?.scrollBy({
                                    left: -300,
                                    behavior: "smooth",
                                })
                            }
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                        >
                            <ArrowRight className="w-8 h-8 text-white rotate-180" />
                        </button>
                    </>
                )}

                {/* Right Fade + Arrow */}
                {canScrollRight && (
                    <>
                        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#081232] to-transparent" />
                        <button
                            onClick={() =>
                                scrollRef.current?.scrollBy({
                                    left: 300,
                                    behavior: "smooth",
                                })
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                        >
                            <ArrowRight className="w-8 h-8 text-white" />
                        </button>
                    </>
                )}
            </div>
        </section>
    );
};

export default RecommendMovieSection;
