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

const data: StatCardProps[] = [
    {
        title: "Users",
        value: "3.2k",
        interval: "Last 30 days",
        trend: "up",
        data: [
            24, 100, 200, 220, 240, 240, 240, 260, 280, 300, 320, 340, 340, 340,
            360, 360, 380, 380, 380, 400, 400, 420, 440, 460, 460, 480, 600,
            640, 880, 920,
        ],
    },
    {
        title: "Reviews",
        value: "325",
        interval: "Last 30 days",
        trend: "neutral",
        data: [
            220, 300, 360, 380, 400, 450, 480, 500, 520, 600, 620, 660, 720,
            740, 760, 780, 800, 820, 820, 840, 840, 900, 900, 920, 970, 1050,
            1080, 1130, 1250, 1640,
        ],
    },
    {
        title: "Reports",
        value: "51",
        interval: "Last 30 days",
        trend: "down",
        data: [
            400, 410, 420, 430, 500, 510, 510, 510, 510, 510, 510, 520, 520,
            520, 520, 520, 520, 530, 530, 530, 530, 530, 530, 530, 530, 600,
            610, 610, 620, 730,
        ],
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
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
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
                Details
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
