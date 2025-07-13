import image from "../assets/sample_poster.png";

const MovieCard = () => (
    <div className="w-48">
        <img src={image} alt="포스터" className="rounded-lg shadow-md" />
        <div className="mt-2 text-sm text-center">
            <p className="font-semibold">인사이드 아웃</p>
            <p className="text-gray-400">2025.07.13</p>
            <p className="text-yellow-400">⭐ 5.0</p>
        </div>
    </div>
);

const MovieSection = ({ title }: { title: string }) => {
    return (
        <section>
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                {Array(6)
                    .fill(0)
                    .map((_, i) => (
                        <MovieCard key={i} />
                    ))}
            </div>
        </section>
    );
};

export default MovieSection;
