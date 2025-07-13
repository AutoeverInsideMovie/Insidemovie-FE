import * as React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div
            className="min-h-screen bg-cover bg-center text-white flex items-center justify-center"
            style={{ backgroundImage: "url()" }}
        >
            <h1 className="text-4xl font-paper font-bold text-white">
                Main 화면입니다.
            </h1>
            <Button
                text={"로그인"}
                textColor="white"
                buttonColor="default"
                onClick={() => navigate("/login")}
                className="ml-10"
            />
        </div>
    );
};

export default Home;
