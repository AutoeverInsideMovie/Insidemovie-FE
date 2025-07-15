import * as React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import SearchSection from "../components/home/SearchSection";
import EmotionSection from "../components/home/EmotionSection";
import CustomMovieSection from "../components/home/CustomMovieSection";
import BoxOfficeSection from "../components/home/BoxOfficeSection";
import MatchSection from "../components/home/MatchSection";
import RecommendMovieSection from "../components/home/RecommendMovieSection";

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex justify-center flex-col items-center px-4">
            <div className="max-w-screen-xl w-full flex flex-col items-center">
                <Button
                    text={"박스오피스 순위"}
                    textColor="white"
                    buttonColor="default"
                    onClick={() => navigate("/boxoffice")}
                    className="ml-10"
                />
                <Button
                    text={"로그인"}
                    textColor="white"
                    buttonColor="default"
                    onClick={() => navigate("/login")}
                    className="ml-10"
                />
                <SearchSection className="mt-10" />
                <EmotionSection className="mt-10" />
                <CustomMovieSection className="mt-10" />
                <RecommendMovieSection className="mt-10" />
                <BoxOfficeSection className="mt-10" />
                <MatchSection className="mt-10" />
                {/* <h1 className="text-4xl font-paper font-bold text-white">
                Main 화면입니다.
            </h1> */}
            </div>
        </div>
    );
};

export default Home;
