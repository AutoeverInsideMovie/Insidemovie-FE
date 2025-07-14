import image from "../assets/sample_poster.png";

const BoxOfficeItem = ({ rank }: { rank: number }) => (
    <div className="bg-white/10 rounded-2xl p-4 flex flex-row items-center space-x-4 backdrop-blur">
        <div className="text-3xl font-bold w-10">{rank}</div>
        <img src={image} className="w-16 h-24 rounded-md" />
        <div>
            <p className="font-bold text-lg">인사이드 아웃</p>
            <p className="text-yellow-400">⭐ 5.0</p>
        </div>
    </div>
);

const BoxOfficeSection = () => {
    return (
        <section>
            <h2 className="text-xl font-bold mb-4">박스오피스 순위</h2>
            <div className="space-y-4">
                {[1, 2, 3].map((rank) => (
                    <BoxOfficeItem key={rank} rank={rank} />
                ))}
            </div>
        </section>
    );
};

export default BoxOfficeSection;
