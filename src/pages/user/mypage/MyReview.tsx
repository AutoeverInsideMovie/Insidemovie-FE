import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowRight from "@assets/arrow_right.svg?react";
import type { Review } from "../../../interfaces/review";
import MyReviewItem from "../../../components/MyReviewItem";
import { memberApi } from "../../../api/memberApi";
import { Pagination } from "@mui/material";

const MyReview: React.FC = () => {
    const navigate = useNavigate();
    const [reviewList, setReviewList] = useState<Review[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const res = await memberApi().getMyReviews({
                    page,
                    pageSize,
                });
                const { content, totalPages: tp } = res.data.data;
                setReviewList(content);
                setTotalPages(tp);
            } catch (e) {
                console.error("박스오피스 조회 에러!! : ", e);
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
                        <p>내가 쓴 리뷰</p>
                    </h1>
                    {reviewList.length === 0 ? (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-white font-extralight text-lg">
                                내가 쓴 리뷰가 없습니다.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col mt-6 mb-20">
                                {reviewList.map((review) => (
                                    <MyReviewItem
                                        reviewId={review.reviewId}
                                        content={review.content}
                                        rating={review.rating}
                                        spoiler={false}
                                        createdAt={review.createdAt}
                                        likeCount={review.likeCount}
                                        myReview={review.myReview}
                                        modify={review.modify}
                                        myLike={review.myLike}
                                        nickname={review.nickname}
                                        memberId={review.memberId}
                                        movieId={review.movieId}
                                        profile={review.profile}
                                        emotions={review.emotions}
                                        isReported={review.isReported}
                                        isConcealed={review.isConcealed}
                                        isMypage={true}
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

export default MyReview;
