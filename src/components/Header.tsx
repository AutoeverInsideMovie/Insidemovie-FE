import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MyPage from "@assets/my_page.svg?react";
import Logout from "@assets/logout.svg?react";
import Logo from "@assets/insidemovie_white.png";
import Button from "./Button";
import { memberApi } from "../api/memberApi";
import JoyImg from "@assets/profile/joy_profile.png";
import SadImg from "@assets/profile/sad_profile.png";
import AngryImg from "@assets/profile/angry_profile.png";
import FearImg from "@assets/profile/fear_profile.png";
import DisgustImg from "@assets/profile/disgust_profile.png";
import BingBong from "@assets/profile/bingbong_profile.png";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isBoxOffice = location.pathname === "/boxoffice";
    const isRecommend = location.pathname === "/recommend";
    const isWeekMatch = location.pathname === "/weekmatch";
    const [scrolled, setScrolled] = useState(false);
    const [nickname, setNickname] = useState<string>("");
    const [userImg, setUserImg] = useState<string>("");

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        (async () => {
            const response = await memberApi().profile();
            setNickname(response.data.data.nickname);
            const emotion = response.data.data.refEmotions as string;
            const emotionMap: Record<string, string> = {
                joy: JoyImg,
                sad: SadImg,
                angry: AngryImg,
                fear: FearImg,
                disgust: DisgustImg,
            };
            setUserImg(emotionMap[emotion] || "");
        })();
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? "h-20 backdrop-blur-md bg-box_bg_white"
                        : "h-40 bg-transparent p-10"
                }`}
            >
                <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 h-full relative">
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
                    {nickname !== "" ? (
                        <div className="relative">
                            <div
                                className="flex items-center cursor-pointer text-white font-light text-sm gap-3"
                                onClick={() => setMenuOpen((open) => !open)}
                            >
                                {nickname}
                                <img
                                    src={userImg ? userImg : BingBong}
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full "
                                />
                            </div>

                            <div
                                ref={menuRef}
                                className={`absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg font-light text-black z-50 transform origin-top-right transition-all duration-300 ease-out ${
                                    menuOpen
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-95 pointer-events-none"
                                }`}
                            >
                                <button
                                    className="flex items-center w-full px-6 py-3 hover:bg-grey_100 hover:rounded-xl"
                                    onClick={() => {
                                        navigate("/mypage");
                                        setMenuOpen(false);
                                    }}
                                >
                                    <MyPage className="mr-2" /> 마이페이지
                                </button>
                                <button
                                    className="flex items-center w-full px-6 py-3 hover:bg-grey_100 hover:rounded-xl text-error_red"
                                    onClick={() => {
                                        // 로그아웃 로직
                                        sessionStorage.removeItem(
                                            "accessToken",
                                        );
                                        sessionStorage.removeItem(
                                            "refreshToken",
                                        );
                                        navigate("/");
                                        window.location.reload();
                                        setMenuOpen(false);
                                    }}
                                >
                                    <Logout className="mr-2" /> 로그아웃
                                </button>
                            </div>
                        </div>
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
            <div className={`${scrolled ? "h-20" : "h-24"}`} />
        </>
    );
};

export default Header;
