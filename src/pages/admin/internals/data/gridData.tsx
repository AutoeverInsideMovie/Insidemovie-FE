import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { GridCellParams, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

type SparkLineData = number[];

function getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month, 0);
    const monthName = date.toLocaleDateString("en-US", {
        month: "short",
    });
    const daysInMonth = date.getDate();
    const days = [];
    let i = 1;
    while (days.length < daysInMonth) {
        days.push(`${monthName} ${i}`);
        i += 1;
    }
    return days;
}

function renderSparklineCell(params: GridCellParams<SparkLineData, any>) {
    const data = getDaysInMonth(4, 2024);
    const { value, colDef } = params;

    if (!value || value.length === 0) {
        return null;
    }

    return (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <SparkLineChart
                data={value}
                width={colDef.computedWidth || 100}
                height={32}
                plotType="bar"
                showHighlight
                showTooltip
                color="hsl(210, 98%, 42%)"
                xAxis={{
                    scaleType: "band",
                    data,
                }}
            />
        </div>
    );
}

function renderStatus(status: "Completed" | "Pending" | "Rejected") {
    const colors: { [index: string]: "success" | "default" | "error" } = {
        Completed: "success",
        Pending: "default",
        Rejected: "error",
    };

    return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(
    params: GridCellParams<{ name: string; color: string }, any, any>,
) {
    if (params.value == null) {
        return "";
    }

    return (
        <Avatar
            sx={{
                backgroundColor: params.value.color,
                width: "24px",
                height: "24px",
                fontSize: "0.85rem",
            }}
        >
            {params.value.name.toUpperCase().substring(0, 1)}
        </Avatar>
    );
}

export const columns: GridColDef[] = [
    {
        field: "content",
        headerName: "Reported review",
        headerAlign: "center",
        flex: 2,
        minWidth: 200,
    },
    {
        field: "reviewer",
        headerName: "Reviewer",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 80,
    },

    {
        field: "status",
        headerName: "Status",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 80,
        renderCell: (params) => renderStatus(params.value as any),
    },
    {
        field: "reporter",
        headerName: "Reporter",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
    },
    {
        field: "SubmissionTime",
        headerName: "Submission Time",
        headerAlign: "center",
        align: "center",
        flex: 2,
        minWidth: 150,
    },
];

export const rows: GridRowsProp = [
    {
        id: 1,
        content: "에라이ㅋㅋㅋ 감독 접어라 쓰레기 영화",
        status: "Rejected",
        reporter: "선량한평론가",
        reviewer: "영화가싫다",
        SubmissionTime: "2025-07-15T09:30:00",
    },
    {
        id: 2,
        content: "이딴 영화에 5점 주는 애들은 다 이상한 놈들임 ㅇㅇ",
        status: "Completed",
        reporter: "닉네임을입력하세요",
        reviewer: "아무튼내마음에안듦",
        SubmissionTime: "2025-06-20T14:45:00",
    },
    {
        id: 3,
        content: "내 취향이랑은 안 맞는 듯",
        status: "Rejected",
        reporter: "네다음영알못",
        reviewer: "영화는내인생",
        SubmissionTime: "2024-12-01T19:00:00",
    },
    {
        id: 4,
        content: "이 영화 미만 잡인 듯 그냥 딴 영화 압살함",
        status: "Rejected",
        reporter: "신고가좋아",
        reviewer: "무비포에버",
        SubmissionTime: "2025-01-10T08:15:00",
    },
    {
        id: 5,
        content: "@@>>히어로즈 오브 더 스톰 지금 다운로드<<@@",
        status: "Pending",
        reporter: "선량한평론가",
        reviewer: "시공조아",
        SubmissionTime: "2025-07-16T16:00:00",
    },
];
