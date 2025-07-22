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

export type StatCardProps = {
    title: string;
    value: string;
    interval: string;
    trend: "up" | "down" | "neutral";
    data: number[];
};

function getLastMonthFromYesterday() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // 어제 날짜

    const days = [];
    for (let i = 29; i >= 0; i--) {
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
    const latestOneMonth = getLastMonthFromYesterday();

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
    const Percentage = calcPercentChange(data[29], data[0]);
    const trendValues = {
        up: "+" + String(Percentage) + "%",
        down: "+" + String(Percentage) + "%",
        neutral: "+" + String(Percentage) + "%",
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
                                data: latestOneMonth,
                            }}
                            sx={{
                                [`& .${areaElementClasses.root}`]: {
                                    fill: `url(#area-gradient-${title})`,
                                },
                            }}
                        >
                            <AreaGradient
                                color={chartColor}
                                id={`area-gradient-${title}`}
                            />
                        </SparkLineChart>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
