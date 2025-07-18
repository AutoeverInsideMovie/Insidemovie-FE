function calcPercentChange(current: number, previous: number): number | null {
    if (previous === 0) return null; // 0으로 나누기 방지
    const result = ((current - previous) / previous) * 100;
    return Math.round(result * 100) / 100;
}

export default calcPercentChange;
