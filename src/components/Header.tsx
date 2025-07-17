import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "@assets/insidemovie_white.png";
import Button from "./Button";
import { memberApi } from "../api/memberApi";
import JoyImg from "@assets/profile/joy_profile.png";
import SadImg from "@assets/profile/sad_profile.png";
import AngryImg from "@assets/profile/angry_profile.png";
import FearImg from "@assets/profile/fear_profile.png";
import DisgustImg from "@assets/profile/disgust_profile.png";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isBoxOffice = location.pathname === "/boxoffice";
    const isRecommend = location.pathname === "/recommend";
    const isWeekMatch = location.pathname === "/weekmatch";
    const [scrolled, setScrolled] = useState(false);
    const [nickname, setNickname] = useState<string | null>(null);
    const [userImg, setUserImg] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    console.log("nickname", nickname);
    useEffect(() => {
        (async () => {
            const response = await memberApi().profile();
            setNickname(response.data.data.nickname);
            console.log("nickname", nickname);
            const emotion = response.data.data.refEmotions as string; // adjust key if necessary
            const emotionMap: Record<string, string> = {
                joy: JoyImg,
                sad: SadImg,
                angry: AngryImg,
                fear: FearImg,
                disgust: DisgustImg,
            };
            setUserImg(emotionMap[emotion] || "");
        })();
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? "backdrop-blur-md bg-gradient-to-r from-box_bg_white to-box_bg_white"
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-2">
                    <div className="flex items-center gap-6">
                        <div
                            onClick={() => navigate("/")}
                            className="cursor-pointer"
                        >
                            <img
                                alt="INSIDE MOVIE"
                                src={Logo}
                                className="text-white font-bold text-lg h-[50px] w-auto"
                            />
                        </div>
                        <nav className="flex gap-6 text-white text-sm font-extralight">
                            <a
                                href="/boxoffice"
                                className={`${
                                    isBoxOffice ? "font-semibold underline" : ""
                                }`}
                            >
                                박스오피스 순위
                            </a>
                            <a
                                href="/recommend"
                                className={`${
                                    isRecommend ? "font-semibold underline" : ""
                                }`}
                            >
                                추천 영화
                            </a>
                            <a
                                href="/weekmatch"
                                className={`${
                                    isWeekMatch ? "font-semibold underline" : ""
                                }`}
                            >
                                금주의 영화 대결
                            </a>
                        </nav>
                    </div>
                    {nickname ? (
                        <img
                            src={userImg}
                            alt="Profile"
                            className="h-10 w-10 rounded-full cursor-pointer"
                            onClick={() => navigate("/login")}
                        />
                    ) : (
                        <Button
                            text="로그인"
                            textColor="white"
                            buttonColor="transparent"
                            onClick={() => navigate("/login")}
                            className="text-sm font-extralight"
                        />
                    )}
                </div>
            </header>
            <div className="h-20" />
        </>
    );
};

export default Header;
