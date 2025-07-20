export interface MovieOne {
    id: number;
    title: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    voteAverage: number;
    originalLanguage: string;
    isLike: boolean | null;
    genre?: string[];
    emotions?: {
        icon: "joy" | "anger" | "sadness" | "fear" | "neutral";
        value: number;
    }[];
}
