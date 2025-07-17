export interface BoxOffice {
    rank: number;
    posterImg: string;
    posterName: string;
    starValue: number;
    emotions: {
        icon: "joy" | "sad" | "angry" | "fear" | "disgust" | "bingbong";
        value: number;
    }[];
}
