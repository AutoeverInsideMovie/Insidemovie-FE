const SearchSection = () => {
    return (
        <div className="flex items-center justify-center">
            <input
                type="text"
                placeholder="원하는 영화를 검색해보세요..."
                className="w-[800px] h-14 rounded-full px-6 text-black placeholder-gray-500 shadow-md focus:outline-none"
            />
        </div>
    );
};

export default SearchSection;
