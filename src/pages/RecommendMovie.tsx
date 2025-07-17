import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "../interfaces/movie";
import SamplePoster from "@assets/sample_poster.png";
import Poster from "../components/Poster";
import Tag from "../components/Tag";
import { useNavigate } from "react-router-dom";

const RecommendMovie: React.FC = () => {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const tagList = ["hello", "ㄷㄷ", "태그", "스포츠", "안녕"];

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/mock/movie.json");
                setMovieList(res.data);
                console.log(res.data);
            } catch (e) {
                console.error("박스오피스 조회 에러!! : ", e);
            }
        })();
    }, []);

    const handleTagClick = (label: string) => {
        setSelectedTags((prev) =>
            prev.includes(label)
                ? prev.filter((t) => t !== label)
                : [...prev, label],
        );
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className="max-w-screen-lg w-full">
                    <div className="flex flex-col pt-10">
                        <h1 className="text-white text-3xl font-semibold text-left pb-3 border-b-[1px] border-box_bg_white">
                            추천 영화
                        </h1>

                        <div className="flex items-center pt-3 mb-4">
                            {tagList.map((tag) => (
                                <Tag
                                    key={tag}
                                    label={tag}
                                    selected={selectedTags.includes(tag)}
                                    onClick={handleTagClick}
                                />
                            ))}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {movieList.map((poster, idx) => (
                                <Poster
                                    key={idx}
                                    posterImg={SamplePoster}
                                    posterName={poster.posterName}
                                    emotionIcon={poster.emotionIcon}
                                    emotionValue={poster.emotionValue}
                                    starValue={poster.starValue}
                                    onClick={() => navigate("/movie")}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendMovie;
