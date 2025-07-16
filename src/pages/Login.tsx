import * as React from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import TransparentBox from "../components/TransparentBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@assets/insidemovie_white.png";
import KakaoIcon from "@assets/kakao.png";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center">
            <TransparentBox
                className="w-[500px] h-[600px]"
                padding="px-8 py-10"
            >
                <img
                    src={Logo}
                    alt="INSIDE MOVIE"
                    className="w-20 mx-auto mb-10"
                />

                <Button
                    text="카카오 로그인"
                    textColor="black"
                    buttonColor="kakao"
                    prefixIcon={KakaoIcon}
                    className="w-full mb-4"
                />

                <div className="flex items-center gap-4 text-white text-xs mb-4 opacity-70">
                    <hr className="flex-1 border-grey_200" />
                    <span>OR</span>
                    <hr className="flex-1 border-grey_200" />
                </div>

                <InputField
                    type="email"
                    placeholder="이메일"
                    icon="email"
                    value={email}
                    onChange={setEmail}
                />

                <InputField
                    type="password"
                    placeholder="비밀번호"
                    icon="password"
                    showToggle
                    value={password}
                    onChange={setPassword}
                />

                <div className="flex justify-end items-center text-sm text-white mt-2 mb-8">
                    <button className="text-xs text-movie_sub hover:underline">
                        비밀번호를 잊으셨나요?
                    </button>
                </div>

                <Button
                    text="로그인"
                    textColor="white"
                    buttonColor="default"
                    className="w-full"
                />

                <p className="text-white text-center text-xs mt-6 opacity-80">
                    계정이 없으신가요?{" "}
                    <span
                        className="text-movie_sub hover:underline cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        회원가입
                    </span>
                </p>
            </TransparentBox>
        </div>
    );
};

export default Login;
