import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedTreeView from "./CustomizedTreeView";
import CustomizedDataGrid from "./CustomizedDataGrid";
import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard, { StatCardProps } from "./StatCard";

const latestOneYearUsers: number[] = [
    6, 100, 150, 300, 270, 360, 450, 600, 800, 750, 1200, 1350,
];
const latestOneYearReviews: number[] = [
    10, 10, 10, 50, 150, 170, 180, 300, 450, 600, 750, 1000,
];
const latestOneYearReports: number[] = [
    1, 1, 2, 4, 5, 20, 30, 40, 50, 60, 70, 80,
];

const data: StatCardProps[] = [
    {
        title: "Users",
        value: String(latestOneYearUsers[11]),
        interval: "Last 12 months",
        trend: "up",
        data: latestOneYearUsers,
    },
    {
        title: "Reviews",
        value: String(latestOneYearReviews[11]),
        interval: "Last 12 months",
        trend: "neutral",
        data: latestOneYearReviews,
    },
    {
        title: "Reports",
        value: String(latestOneYearReports[11]),
        interval: "Last 12 months",
        trend: "down",
        data: latestOneYearReports,
    },
];

export default function MainGrid() {
    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Overview
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
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Reports
            </Typography>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <CustomizedDataGrid />
                </Grid>
                <Grid size={{ xs: 12, lg: 3 }}>
                    <Stack
                        gap={2}
                        direction={{ xs: "column", sm: "row", lg: "column" }}
                    >
                        <CustomizedTreeView />
                    </Stack>
                </Grid>
            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}
