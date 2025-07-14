import image from "../assets/sample_poster.png";

const DebateSection = () => {
    return (
        <section>
            <h2 className="text-xl font-bold mb-4">금주의 영화 대결</h2>
            <div className="flex justify-center gap-10">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-40 text-center">
                        <img src={image} className="rounded-md" />
                        <p className="mt-2 font-medium">인사이드 아웃</p>
                        <p className="text-yellow-400">⭐ 4.5</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DebateSection;
