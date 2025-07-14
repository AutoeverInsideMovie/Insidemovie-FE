import * as React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import SearchSection from "../components/home/SearchSection";
import CharacterCarousel from "../components/home/CharacterCarousel";
import MovieSection from "../components/home/MovieSection";
import BoxOfficeSection from "../components/home/BoxOfficeSection";
import DebateSection from "../components/home/DebateSection";

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
                <SearchSection className="mb-20"/>
                <CharacterCarousel />
                <MovieSection title="맞춤 영화" />
                <MovieSection title="추천 영화" />
                <BoxOfficeSection />
                <DebateSection />
                {/* <h1 className="text-4xl font-paper font-bold text-white">
                Main 화면입니다.
            </h1> */}
            </div>

        </div>
    );
};

export default Home;
