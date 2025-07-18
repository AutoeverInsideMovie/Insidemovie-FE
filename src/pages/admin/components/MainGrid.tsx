import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedTreeView from "./CustomizedTreeView";
import ReportBoard from "./ReportBoard";
import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard, { StatCardProps } from "./StatCard";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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

const data: StatCardProps[] = [
    {
        title: "유저",
        value: String(latestOneMonthUsers[29]),
        interval: "일별 추이 (지난 30일 - 어제)",
        trend: "up",
        data: latestOneMonthUsers,
    },
    {
        title: "리뷰",
        value: String(latestOneMonthReviews[29]),
        interval: "일별 추이 (지난 30일 - 어제)",
        trend: "neutral",
        data: latestOneMonthReviews,
    },
    {
        title: "신고",
        value: String(latestOneMonthReports[29]),
        interval: "일별 추이 (지난 30일 - 어제)",
        trend: "down",
        data: latestOneMonthReports,
    },
];

export default function MainGrid() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/admin/report"); // 이동할 경로 입력
    };
    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mt: 4, mb: 2 }}>
                개요
            </Typography>

            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                {data.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 4, lg: 4 }}>
                        <StatCard {...card} />
                    </Grid>
                ))}
                <Grid size={{ xs: 12, md: 6 }}>
                    <SessionsChart />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <PageViewsBarChart />
                </Grid>
            </Grid>
            <Typography
                component="h2"
                variant="h6"
                sx={{ display: "flex", mt: 4 }}
            >
                신고 내역
            </Typography>
            <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "flex", mb: 2 }}
            >
                미처리 신고 간편 삭제
            </Typography>
            <Grid container columns={12}>
                <Grid size={{ xs: 12, lg: 12 }}>
                    <ReportBoard filtered={true} />
                </Grid>
                <Button onClick={handleClick}>
                    <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                    >
                        수정 및 다중 삭제 →
                    </Typography>
                </Button>
            </Grid>

            <Typography component="h2" variant="h6" sx={{ mt: 4, mb: 2 }}>
                둘러보기
            </Typography>
            <Grid size={{ xs: 12, lg: 12 }}>
                <Stack
                    gap={2}
                    direction={{ xs: "column", sm: "row", lg: "column" }}
                >
                    <CustomizedTreeView />
                </Stack>
            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}
