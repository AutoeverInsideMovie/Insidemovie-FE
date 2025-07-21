import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MyPage from "@assets/my_page.svg?react";
import Logout from "@assets/logout.svg?react";
import Logo from "@assets/insidemovie_white.png";
import Button from "./Button";
import { memberApi } from "../api/memberApi";
import { ConfirmDialog } from "./ConfirmDialog";
import bingbongProfile from "@assets/profile/bingbong_profile.png";
import joyProfile from "@assets/profile/joy_profile.png";
import angryProfile from "@assets/profile/angry_profile.png";
import sadnessProfile from "@assets/profile/sad_profile.png";
import fearProfile from "@assets/profile/fear_profile.png";
import disgustProfile from "@assets/profile/disgust_profile.png";

interface UserInfo {
    memberId: number;
    email: string;
    nickname: string;
    reportCount: number;
    likeCount: number;
    repEmotionType: string;
    authority: string;
}

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isBoxOffice = location.pathname === "/boxoffice";
    const isRecommend = location.pathname === "/recommend";
    const isWeekMatch = location.pathname === "/weekmatch";
    const [scrolled, setScrolled] = useState(false);

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const emotionProfileMap: Record<string, string> = {
        joy: joyProfile,
        anger: angryProfile,
        sadness: sadnessProfile,
        fear: fearProfile,
        disgust: disgustProfile,
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const fetchProfile = () => {
            memberApi()
                .profile()
                .then((res) => {
                    setUserInfo(res.data.data);
                })
                .catch((err) => {
                    console.error("Failed to load user info", err);
                });
        };

        fetchProfile();

        const handleProfileUpdated = () => {
            fetchProfile();
        };

        window.addEventListener("profileUpdated", handleProfileUpdated);

        return () => {
            window.removeEventListener("profileUpdated", handleProfileUpdated);
        };
    }, []);

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
                    {userInfo?.nickname ? (
                        <div className="relative">
                            <div
                                className="flex items-center cursor-pointer text-white font-light text-sm gap-3"
                                onClick={() => setMenuOpen((open) => !open)}
                            >
                                {userInfo.nickname}
                                <img
                                    src={
                                        userInfo
                                            ? emotionProfileMap[
                                                  userInfo.repEmotionType?.toLowerCase()
                                              ]
                                            : bingbongProfile
                                    }
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
                                    onClick={() => setLogoutDialogOpen(true)}
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
            <ConfirmDialog
                className="w-full max-w-md"
                isOpen={logoutDialogOpen}
                title="로그아웃"
                message="로그아웃 하시겠습니까?"
                isRedButton={true}
                showCancel={true}
                onConfirm={async () => {
                    try {
                        await memberApi().logout();
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        setMenuOpen(false);
                        setLogoutDialogOpen(false);
                        navigate("/", { replace: true });
                        window.location.replace("/");
                        window.location.reload();
                    } catch (err) {
                        console.error("Logout API failed", err);
                    }
                }}
                onCancel={() => setLogoutDialogOpen(false)}
            />
        </>
    );
};

export default Header;
