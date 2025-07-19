import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import {
    GridCellParams,
    GridRowsProp,
    GridColDef,
    type GridValidRowModel,
} from "@mui/x-data-grid";
import type { ReportStatus } from "types/reportStatus";

export const statusDisplayMap: Record<
    ReportStatus,
    {
        statusLabel: string;
        resultLabel: string;
        statusColor: "default" | "warning";
        resultColor: "success" | "error" | "default";
    }
> = {
    APPROVED: {
        statusLabel: "처리",
        resultLabel: "삭제",
        statusColor: "default",
        resultColor: "error",
    },
    REJECTED: {
        statusLabel: "처리",
        resultLabel: "유지",
        statusColor: "default",
        resultColor: "success",
    },
    UNPROCESSED: {
        statusLabel: "미처리",
        resultLabel: "대기",
        statusColor: "warning",
        resultColor: "default",
    },
};

function renderStatus(status: ReportStatus) {
    const config = statusDisplayMap[status];
    if (config.statusColor === "warning") {
        return (
            <Chip
                label={config.statusLabel}
                size="small"
                sx={{
                    backgroundColor: "#fff9c4",
                    border: "1px solid #D4AF37",
                    fontWeight: "bold",
                    boxShadow: "none",
                    "& .MuiChip-label": {
                        color: "#D4AF37",
                    },
                }}
            />
        );
    }

    return (
        <Chip
            label={config.statusLabel}
            color={config.statusColor}
            size="small"
        />
    );
}

function renderResult(status: ReportStatus) {
    const config = statusDisplayMap[status];

    return (
        <Chip
            label={config.resultLabel}
            color={config.resultColor}
            size="small"
        />
    );
}

type ReportType =
    | "INAPPROPRIATE_LANGUAGE"
    | "SEXUAL_CONTENT"
    | "SPOILER"
    | "RUDE_BEHAVIOR"
    | "ADVERTISEMENT";

const reportTypeLabelMap: Record<ReportType, string> = {
    INAPPROPRIATE_LANGUAGE: "욕설/비방",
    SEXUAL_CONTENT: "성희롱",
    SPOILER: "스포일러",
    RUDE_BEHAVIOR: "비매너",
    ADVERTISEMENT: "광고",
};
function renderType(type: ReportType) {
    const str = reportTypeLabelMap[type] ?? "알 수 없음";
    return <Chip label={str} color="default" size="small" />;
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

export const renderButton = (status, updateReportStatus) => {
    if (status === "UNPROCESSED") {
        return (
            <Chip
                label="삭제"
                color="error"
                variant="outlined"
                size="small"
                clickable
                onClick={updateReportStatus}
            />
        );
    }
};
export const renderUpdateButton = (status, updateReportStatus) => {
    if (status !== "UNPROCESSED") {
        return (
            <Chip
                label="변경"
                color="secondary"
                variant="outlined"
                size="small"
                clickable
                onClick={updateReportStatus}
            />
        );
    }
};

export function getColumns(handleStatus: (id: number) => void): GridColDef[] {
    return [
        {
            field: "button",
            headerName: "간편 삭제",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
            minWidth: 100,
            // renderHeader: () => null,
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params) =>
                renderButton(params.row.status, () =>
                    handleStatus(params.row.id),
                ),
        },
        {
            field: "status",
        },
        {
            field: "reportStatus",
            headerName: "처리 상태",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
            minWidth: 80,
            renderCell: (params) => renderStatus(params.row.status),
        },
        {
            field: "reportResult",
            headerName: "처리 결과",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
            minWidth: 80,
            renderCell: (params) => renderResult(params.row.status),
        },
        {
            field: "content",
            headerName: "리뷰",
            headerAlign: "center",
            flex: 2,
            minWidth: 200,
        },
        {
            field: "type",
            headerName: "종류",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
            minWidth: 100,
            renderCell: (params) => renderType(params.value),
        },
        {
            field: "reviewer",
            headerName: "작성자",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
            minWidth: 80,
        },
        {
            field: "reporter",
            headerName: "신고자",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
            minWidth: 100,
        },
        {
            field: "submissionTime",
            headerName: "접수 시간",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 150,
        },
    ];
}
