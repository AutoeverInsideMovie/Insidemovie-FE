import * as React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import BoxOfficeMovie from "./pages/BoxOfficeMovie";
import Header from "./components/Header";
import RecommendMovie from "./pages/RecommendMovie";
import WeekMatch from "./pages/WeekMatch";
import MovieDetail from "./pages/MovieDetail";
import Dashboard from "./pages/admin/pages/Dashboard";
import ReportPage from "./pages/admin/pages/ReportPage";
import MemberPage from "./pages/admin/pages/MemberPage";
import SettingsPage from "./pages/admin/pages/SettingsPage";
import ReviewWrite from "./pages/ReviewWrite";
import KakaoRedirect from "./pages/KakaoRedirect";
import SignupKakao from "./pages/SignupKakao";

const AppContent: React.FC = () => {
    const location = useLocation();
    const hideHeader =
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/signup-kakao" ||
        location.pathname === "/admin";

    return (
        <>
            {!hideHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup-kakao" element={<SignupKakao />} />
                <Route path="/recommend" element={<RecommendMovie />} />
                <Route path="/boxoffice" element={<BoxOfficeMovie />} />
                <Route path="/weekmatch" element={<WeekMatch />} />
                <Route path="/movie" element={<MovieDetail />} />
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/report" element={<ReportPage />} />
                <Route path="/admin/member" element={<MemberPage />} />
                <Route path="/admin/settings" element={<SettingsPage />} />
                <Route path="/review-write" element={<ReviewWrite />} />
                <Route
                    path="/login/oauth2/code/kakao"
                    element={<KakaoRedirect />}
                />
            </Routes>
        </>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default App;
