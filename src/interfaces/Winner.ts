export interface Winner {
    posterImg: string;
    posterName: string;
    emotionIcon: "joy" | "sad" | "angry" | "fear" | "disgust" | "bingbong";
    emotionValue: number;
    starValue: number;
    winnerWeek: string;
}
