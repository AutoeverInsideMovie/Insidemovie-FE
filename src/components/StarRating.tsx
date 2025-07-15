import React, { useEffect, useState } from "react";
import FullStarIcon from "../assets/star_full.svg?react";
import HalfStarIcon from "../assets/star_half.svg?react";
import EmptyStarIcon from "../assets/star_empty.svg?react";

interface StarRating {
    rating: number; // 예: 3.5
}

const StarRating: React.FC<StarRating> = ({ rating }) => {
    const [stars, setStars] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        const fullStars = Math.floor(rating); // 정수 부분
        const hasHalfStar = rating % 1 >= 0.5; // 소수점 체크
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        const starElements: React.JSX.Element[] = [];

        for (let i = 0; i < fullStars; i++) {
            starElements.push(<FullStarIcon />);
        }

        if (hasHalfStar) {
            starElements.push(<HalfStarIcon />);
        }

        for (let i = 0; i < emptyStars; i++) {
            starElements.push(<EmptyStarIcon />);
        }

        setStars(starElements);
    }, [rating]);

    return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;
