import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import CustomizedTreeView from "./CustomizedTreeView";
import ReportBoard from "./ReportBoard";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard, { type StatCardProps } from "./StatCard";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface DashboardDataDTO {
    totalMembers: number[];
    totalReviews: number[];
    concealedReviews: number[];
    MonthlytotalMembers: number[];
    MonthlytotalReviews: number[];
    MonthlyconcealedReviews: number[];
}

export default function MainGrid() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/admin/report"); // 이동할 경로 입력
    };
    const [dashboardState, setDashboardState] =
        useState<DashboardDataDTO>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get<DashboardDataDTO | null>(
                    "http://localhost:8080/api/v1/admin/dashboard",
                    // "/mock/dashBoardData.json",
                );
                setDashboardState(res.data);
            } catch (err) {
                console.error("대시보드 데이터 불러오기 실패:", err);
            }
        };
        fetchData();
    }, []);

    if (!dashboardState) {
        return <div className="text-white text-center">Loading...</div>;
    }
    const data: StatCardProps[] = [
        {
            title: "유저",
            value: String(dashboardState.totalMembers[29]),
            interval: "일별 추이 (지난 30일 - 어제)",
            trend: "up",
            data: dashboardState.totalMembers,
        },
        {
            title: "리뷰",
            value: String(dashboardState.totalReviews[29]),
            interval: "일별 추이 (지난 30일 - 어제)",
            trend: "neutral",
            data: dashboardState.totalReviews,
        },
        {
            title: "신고",
            value: String(dashboardState.concealedReviews[29]),
            interval: "일별 추이 (지난 30일 - 어제)",
            trend: "down",
            data: dashboardState.concealedReviews,
        },
    ];
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
                    <SessionsChart
                        MonthlytotalMembers={dashboardState.MonthlytotalMembers}
                        MonthlytotalReviews={dashboardState.MonthlytotalReviews}
                        MonthlyconcealedReviews={
                            dashboardState.MonthlyconcealedReviews
                        }
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <PageViewsBarChart
                        MonthlytotalMembers={dashboardState.MonthlytotalMembers}
                        MonthlytotalReviews={dashboardState.MonthlytotalReviews}
                        MonthlyconcealedReviews={
                            dashboardState.MonthlyconcealedReviews
                        }
                    />
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
