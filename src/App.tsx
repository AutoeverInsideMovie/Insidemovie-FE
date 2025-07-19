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
import ReviewWrite from "./pages/ReviewWrite";
import Dashboard from "./pages/admin/pages/Dashboard";
import ReportPage from "./pages/admin/pages/ReportPage";

const AppContent: React.FC = () => {
    const location = useLocation();
    const hideHeader =
        location.pathname === "/login" || location.pathname === "/signup";

    return (
        <>
            {!hideHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/recommend" element={<RecommendMovie />} />
                <Route path="/boxoffice" element={<BoxOfficeMovie />} />
                <Route path="/weekmatch" element={<WeekMatch />} />
                <Route path="/movie" element={<MovieDetail />} />
                <Route path="/review-write" element={<ReviewWrite />} />
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/report" element={<ReportPage />} />
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
