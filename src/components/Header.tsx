import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "@assets/insidemovie_white.png";
import Button from "./Button";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isBoxOffice = location.pathname === "/boxoffice";
    const isRecommend = location.pathname === "/recommend";
    const isWeekMatch = location.pathname === "/weekmatch";
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
                    <Button
                        text={"로그인"}
                        textColor="white"
                        buttonColor="transparent"
                        onClick={() => navigate("/login")}
                        className="text-sm font-extralight"
                    />
                </div>
            </header>
            <div className="h-20" />
        </>
    );
};

export default Header;
