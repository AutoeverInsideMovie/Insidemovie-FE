import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import type { Movie } from "../../../interfaces/movie";
import Poster from "../../../components/Poster";
import ArrowRight from "@assets/arrow_right.svg?react";
import { memberApi } from "../../../api/memberApi";
import { Pagination } from "@mui/material";

const WatchedMovie: React.FC = () => {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(40);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const res = await memberApi().getMyVisitedMovies({
                    page,
                    pageSize,
                });
                const { content, totalPages: tp } = res.data.data;
                setMovieList(content);
                setTotalPages(tp);
            } catch (e) {
                console.error("내가 관람한 영화 조회 에러: ", e);
            }
        })();
    }, [page, pageSize]);

    return (
        <div>
            <div className="flex justify-center">
                <div className="max-w-screen-lg w-full flex flex-col pt-20">
                    <h1 className=" flex gap-4 items-center text-white text-3xl font-semibold text-left pb-3 border-b-[1px] border-box_bg_white">
                        <p
                            className="font-extralight cursor-pointer hover:font-normal"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            마이페이지
                        </p>
                        <ArrowRight />
                        <p>관람 한 영화</p>
                    </h1>
                    {movieList.length === 0 ? (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-white font-extralight text-lg">
                                관람 한 영화가 없습니다.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="min-h-48 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4 mb-20">
                                {movieList.map((poster) => (
                                    <Poster
                                        key={poster.movieId}
                                        posterImg={poster.posterPath}
                                        posterName={poster.title}
                                        emotionIcon={"joy"}
                                        emotionValue={0}
                                        starValue={poster.voteAverage}
                                        onClick={() =>
                                            navigate(`/movie/${poster.movieId}`)
                                        }
                                    />
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex justify-center text-white mt-6 mb-36">
                                    <Pagination
                                        count={totalPages}
                                        page={page + 1}
                                        onChange={(e, value) =>
                                            setPage(value - 1)
                                        }
                                        siblingCount={1}
                                        boundaryCount={1}
                                        showFirstButton
                                        showLastButton
                                        color="primary"
                                        sx={{
                                            "& .MuiPaginationItem-root": {
                                                color: "#fff",
                                            },
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WatchedMovie;
