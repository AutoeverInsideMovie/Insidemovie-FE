import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import BoxOfficeDetail from "./pages/BoxOfficeDetail";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/boxoffice" element={<BoxOfficeDetail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
