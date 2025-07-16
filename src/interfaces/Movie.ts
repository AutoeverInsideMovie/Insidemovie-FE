export interface Movie {
    id: number;
    posterImg: string;
    posterName: string;
    emotionIcon: "joy" | "sad" | "angry" | "fear" | "disgust" | "bingbong";
    emotionValue: number;
    starValue: number;
}
