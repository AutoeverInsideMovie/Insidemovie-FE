export type filterItem = { date: string; count: number };

export interface FilteredCumulativeData {
    totalMembers: number[];
    totalReviews: number[];
    concealedReviews: number[];
    MonthlytotalMembers: number[];
    MonthlytotalReviews: number[];
    MonthlyconcealedReviews: number[];
}
