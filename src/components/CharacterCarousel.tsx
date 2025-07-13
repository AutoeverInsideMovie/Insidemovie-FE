const characters = [
    "../assets/profile/joy_profile",
    "../assets/profile/sad_profile",
    "../assets/profile/angry_profile",
    "../assets/profile/fear_profile",
    "../assets/profile/disgust_profile",
];

const CharacterCarousel = () => {
    return (
        <div className="flex items-center justify-center space-x-4 overflow-x-auto scrollbar-hide py-4">
            {characters.map((src, i) => (
                <div
                    key={i}
                    className="w-32 h-48 rounded-2xl bg-white/10 backdrop-blur p-2 flex items-center justify-center"
                >
                    <img
                        src={src}
                        alt="char"
                        className="h-full object-contain"
                    />
                </div>
            ))}
        </div>
    );
};

export default CharacterCarousel;
