import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

// 더미데이터
const latestOneYearUsers: number[] = [
    1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500, 2600,
];
const latestOneYearReviews: number[] = [
    500, 900, 700, 1400, 1100, 1700, 2300, 2000, 2600, 2900, 2300, 2400,
];
const latestOneYearReports: number[] = [
    300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800, 1850,
];

function AreaGradient({ color, id }: { color: string; id: string }) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    );
}

function getLastYearFromLastMonth() {
    // 지난달 기준 최근 12달 라벨링(ex. 25년 3월 기준, 24년 3월 ~ 25년 2월 추출)
    const today: Date = new Date();
    const lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);

    const year = lastMonthDate.getFullYear();
    const month = lastMonthDate.getMonth(); // 0~11
    const monthArray = [];
    for (let i = 0; i < 12; i++) {
        monthArray.push(i); // 월 배열
    }

    const months = monthArray
        .map((i) => {
            const d = new Date(year, month - i, 1); // 오늘 연/월부터 역순
            return d.toLocaleDateString("ko-KR", {
                year: "2-digit",
                month: "long",
            });
        })
        .reverse(); // 그래프에 나타내기 위해선 역순으로 된 배열을 반대로 써야함

    return months;
}
export default function SessionsChart() {
    const theme = useTheme();
    const data = getLastYearFromLastMonth();

    const colorPalette = [
        theme.palette.primary.light,
        theme.palette.primary.main,
        theme.palette.primary.dark,
    ];

    return (
        <Card variant="outlined" sx={{ width: "100%" }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    월별 추이
                </Typography>
                <Stack sx={{ justifyContent: "space-between" }}>
                    <Stack
                        direction="row"
                        sx={{
                            alignContent: { xs: "center", sm: "flex-start" },
                            alignItems: "center",
                            gap: 1,
                        }}
                    ></Stack>
                    <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                    >
                        전체 통계 (지난 1년 - 지난 달)
                    </Typography>
                </Stack>
                <LineChart
                    colors={colorPalette}
                    xAxis={[
                        {
                            scaleType: "point",
                            data,
                            tickInterval: (months, i) =>
                                (i + 1) % 2 === 0 && i !== 11,
                            height: 24,
                        },
                    ]}
                    yAxis={[{ width: 50 }]}
                    series={[
                        {
                            id: "users",
                            label: "유저 수",
                            showMark: false,
                            curve: "linear",
                            stack: "total",
                            area: true,
                            stackOrder: "ascending",
                            data: latestOneYearUsers,
                            color: theme.palette.success.main,
                        },
                        {
                            id: "reviews",
                            label: "리뷰 수",
                            showMark: false,
                            curve: "linear",
                            stack: "total",
                            area: true,
                            stackOrder: "ascending",
                            data: latestOneYearReviews,
                            color: theme.palette.grey[400],
                        },
                        {
                            id: "reports",
                            label: "신고 수",
                            showMark: false,
                            curve: "linear",
                            stack: "total",
                            stackOrder: "ascending",
                            data: latestOneYearReports,
                            area: true,
                            color: theme.palette.error.main,
                        },
                    ]}
                    height={250}
                    margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
                    grid={{ horizontal: true }}
                    sx={{
                        "& .MuiAreaElement-series-users": {
                            fill: "url(#users)",
                        },
                        "& .MuiAreaElement-series-reviews": {
                            fill: "url('#reviews')",
                        },
                        "& .MuiAreaElement-series-reports": {
                            fill: "url('#reports')",
                        },
                    }}
                    hideLegend
                >
                    <AreaGradient
                        color={theme.palette.success.light}
                        id="users"
                    />
                    <AreaGradient
                        color={theme.palette.grey[400]}
                        id="reviews"
                    />
                    <AreaGradient
                        color={theme.palette.error.light}
                        id="reports"
                    />
                </LineChart>
            </CardContent>
        </Card>
    );
}
