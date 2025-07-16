import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { areaElementClasses } from "@mui/x-charts/LineChart";
import calcPercentChange from "../../../services/calcPercentChange";

const latestOneYearUsers: number[] = [
    1000, 1100, 1150, 1100, 1200, 1250, 1260, 1270, 1280, 1290, 1300, 1350,
];
const latestOneYearReviews: number[] = [
    1000, 1100, 1150, 1100, 1200, 1250, 1260, 1270, 1280, 1290, 1300, 1800,
];
const latestOneYearReports: number[] = [
    550, 560, 570, 580, 600, 670, 680, 690, 700, 710, 720, 730,
];

export type StatCardProps = {
    title: string;
    value: string;
    interval: string;
    trend: "up" | "down" | "neutral";
    data: number[];
};

function getLastOneYears() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0~11

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

function AreaGradient({ color, id }: { color: string; id: string }) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    );
}

export default function StatCard({
    title,
    value,
    interval,
    trend,
    data,
}: StatCardProps) {
    const theme = useTheme();
    const latestOneYear = getLastOneYears();

    const trendColors = {
        up:
            theme.palette.mode === "light"
                ? theme.palette.success.main
                : theme.palette.success.dark,
        down:
            theme.palette.mode === "light"
                ? theme.palette.error.main
                : theme.palette.error.dark,
        neutral:
            theme.palette.mode === "light"
                ? theme.palette.grey[400]
                : theme.palette.grey[700],
    };

    const labelColors = {
        up: "success" as const,
        down: "error" as const,
        neutral: "default" as const,
    };

    const color = labelColors[trend];
    const chartColor = trendColors[trend];

    // (현재 월 - 전월 값) / 전월 값 * 100
    const userPercentage = calcPercentChange(
        latestOneYearUsers[11],
        latestOneYearUsers[0],
    );
    const reviewNum = calcPercentChange(
        latestOneYearReviews[11],
        latestOneYearReviews[0],
    );
    const reportNum = calcPercentChange(
        latestOneYearReports[11],
        latestOneYearReports[0],
    );
    const trendValues = {
        up: String(userPercentage) + "%",
        neutral: String(reviewNum) + "%",
        down: String(reportNum) + "%",
    };

    return (
        <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    {title}
                </Typography>
                <Stack
                    direction="column"
                    sx={{
                        justifyContent: "space-between",
                        flexGrow: "1",
                        gap: 1,
                    }}
                >
                    <Stack sx={{ justifyContent: "space-between" }}>
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h4" component="p">
                                {value}
                            </Typography>
                            <Chip
                                size="small"
                                color={color}
                                label={trendValues[trend]}
                            />
                        </Stack>
                        <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                        >
                            {interval}
                        </Typography>
                    </Stack>
                    <Box sx={{ width: "100%", height: 50 }}>
                        <SparkLineChart
                            color={chartColor}
                            data={data}
                            area
                            showHighlight
                            showTooltip
                            xAxis={{
                                scaleType: "band",
                                data: latestOneYear, // Use the correct property 'data' for xAxis
                            }}
                            sx={{
                                [`& .${areaElementClasses.root}`]: {
                                    fill: `url(#area-gradient-${value})`,
                                },
                            }}
                        >
                            <AreaGradient
                                color={chartColor}
                                id={`area-gradient-${value}`}
                            />
                        </SparkLineChart>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
