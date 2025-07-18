import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { alpha, useTheme } from "@mui/material/styles";

// 더미데이터
const latestOneMonthUsers: number[] = [
    1000, 1100, 1150, 1100, 1200, 1250, 1260, 1270, 1280, 1290, 1300, 1350,
    1000, 1100, 1150, 1100, 1200, 1250, 1260, 1270, 1280, 1290, 1300, 1350,
    1000, 1100, 1150, 1100, 1200, 1250,
];
const latestOneMonthReviews: number[] = [
    1000, 1100, 1150, 1100, 1200, 1250, 1260, 1270, 1280, 1290, 1300, 1800,
    1000, 1100, 1150, 1100, 1200, 1250, 1260, 1270, 1280, 1290, 1300, 1800,
    1000, 1100, 1150, 1100, 1200, 1250,
];
const latestOneMonthReports: number[] = [
    550, 560, 570, 580, 600, 670, 680, 690, 700, 710, 720, 730, 550, 560, 570,
    580, 600, 670, 680, 690, 700, 710, 720, 730, 550, 560, 570, 580, 600, 670,
];

function getLastWeekFromYesterday() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // 어제 날짜

    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(yesterday);
        d.setDate(yesterday.getDate() - i);
        const label = d.toLocaleDateString("ko-KR", {
            month: "long",
            day: "numeric",
        });
        days.push(label);
    }

    return days;
}

export default function PageViewsBarChart() {
    const theme = useTheme();
    const latestOneWeek = getLastWeekFromYesterday();
    const colorPalette = [
        (theme.vars || theme).palette.primary.dark,
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.primary.light,
    ];
    return (
        <Card variant="outlined" sx={{ width: "100%" }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    일별 추이
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
                        전체 통계 (지난 7일 - 어제)
                    </Typography>
                </Stack>
                <BarChart
                    borderRadius={8}
                    colors={colorPalette}
                    xAxis={[
                        {
                            scaleType: "band",
                            categoryGapRatio: 0.5,
                            data: latestOneWeek,
                            height: 24,
                        },
                    ]}
                    yAxis={[{ width: 50 }]}
                    series={[
                        {
                            id: "users",
                            label: "유저 수",
                            data: latestOneMonthUsers.slice(22, 29),
                            stack: "A",
                            color: alpha(theme.palette.success.main, 0.8),
                        },
                        {
                            id: "reviews",
                            label: "리뷰 수",
                            data: latestOneMonthReviews.slice(22, 29),
                            stack: "B",
                            color: alpha(theme.palette.grey[400], 0.8),
                        },
                        {
                            id: "reports",
                            label: "신고 수",
                            data: latestOneMonthReports.slice(22, 29),
                            stack: "C",
                            color: alpha(theme.palette.error.main, 0.8),
                        },
                    ]}
                    height={250}
                    margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
                    grid={{ horizontal: true }}
                    hideLegend
                />
            </CardContent>
        </Card>
    );
}
