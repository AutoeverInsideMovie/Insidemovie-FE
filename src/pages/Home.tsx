import * as React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import SearchSection from "../components/SearchSection";
import CharacterCarousel from "../components/CharacterCarousel";
import MovieSection from "../components/MovieSection";
import BoxOfficeSection from "../components/BoxOfficeSection";
import DebateSection from "../components/DebateSection";

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div
            className="min-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center"
            style={{ backgroundImage: "url()" }}
        >
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
            <SearchSection />
            <CharacterCarousel />
            <MovieSection title="맞춤 영화" />
            <MovieSection title="추천 영화" />
            <BoxOfficeSection />
            <DebateSection />
            {/* <h1 className="text-4xl font-paper font-bold text-white">
                Main 화면입니다.
            </h1> */}
        </div>
    );
};

export default Home;
