import * as React from "react";
import SearchSection from "../components/home/SearchSection";
import EmotionSection from "../components/home/EmotionSection";
import CustomMovieSection from "../components/home/CustomMovieSection";
import BoxOfficeSection from "../components/home/BoxOfficeSection";
import MatchSection from "../components/home/MatchSection";
import RecommendMovieSection from "../components/home/RecommendMovieSection";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex justify-center flex-col items-center px-4">
            <div className="max-w-screen-lg w-full flex flex-col items-center">
                <SearchSection className="mt-10" />
                <EmotionSection className="mt-10" />
                <CustomMovieSection className="mt-10" />
                <RecommendMovieSection className="mt-10" />
                <BoxOfficeSection className="mt-10" />
                <MatchSection className="mt-10" />
            </div>
        </div>
    );
};

export default Home;
