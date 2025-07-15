import * as React from "react";
import SearchIcon from "@assets/search.svg?react";

interface SearchSectionProps {
    className?: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({ className = "" }) => {
    return (
        <div className={`max-w-screen-md w-full ${className}`}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="영화를 검색하세요."
                    className="w-full py-4 px-5 pr-12 rounded-full bg-box_bg_white text-white text-sm font-light placeholder-white placeholder-opacity-60 focus:outline-none"
                />
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white">
                    <SearchIcon className="w-7 h-7 opacity-40" />
                </div>
            </div>
        </div>
    );
};

export default SearchSection;
