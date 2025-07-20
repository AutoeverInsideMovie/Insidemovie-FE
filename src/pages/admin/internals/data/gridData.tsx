import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import type { ReportStatus } from "../../../../types/reportStatus";
import axios from "axios";

export const statusDisplayMap: Record<
    ReportStatus,
    {
        statusLabel: string;
        resultLabel: string;
        statusColor: "default" | "warning";
        resultColor: "success" | "error" | "default";
    }
> = {
    ACCEPTED: {
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
    if (!config) {
        console.warn(`Unknown status: ${status}`);
        return <Chip label="알 수 없음" color="default" size="small" />;
    }
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
    console.log("renderStatus called with:", status);
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

export const renderButtonSimple = (
    reportId: number,
    currentStatus: ReportStatus,
    handleStatusChange: (id: number, newStatus: ReportStatus) => void,
) => {
    const handleClick = async (newStatus: ReportStatus) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("토큰이 없습니다.");
            return;
        }
        let statusParam = "";
        if (newStatus === "REJECTED") {
            statusParam = "reject";
        } else if (newStatus === "ACCEPTED") {
            statusParam = "accept";
        } else if (newStatus === "UNPROCESSED") {
            statusParam = "unprocessed";
        }

        try {
            await axios.patch(
                `http://localhost:8080/api/v1/admin/reports/${reportId}/${statusParam}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            handleStatusChange(reportId, newStatus);
        } catch (err) {
            console.error("상태 변경 실패 : ", err);
        }
    };

    if (currentStatus === "UNPROCESSED") {
        return (
            <>
                <Chip
                    label="삭제"
                    color="error"
                    variant="outlined"
                    size="small"
                    clickable
                    onClick={() => handleClick("ACCEPTED")}
                />
                <Chip
                    label="유지"
                    color="success"
                    variant="outlined"
                    size="small"
                    clickable
                    onClick={() => handleClick("REJECTED")}
                />
            </>
        );
    } else {
        return (
            <>
                <Chip
                    label="보류"
                    color="primary"
                    variant="outlined"
                    size="small"
                    clickable
                    onClick={() => handleClick("UNPROCESSED")}
                />
            </>
        );
    }
};

export function getSimpleColumns(
    handleStatus: (reportId: number, newStatus: ReportStatus) => void,
): GridColDef[] {
    return [
        {
            field: "button",
            headerName: "간편 관리",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
            minWidth: 100,
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params) =>
                renderButtonSimple(
                    params.row.id,
                    params.row.status,
                    handleStatus,
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
            field: "submissionTime",
            headerName: "접수 시간",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 150,
        },
    ];
}

export function getColumns(
    handleStatus: (reportId: number, newStatus: ReportStatus) => void,
): GridColDef[] {
    return [
        {
            field: "button",
            headerName: "간편 관리",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
            minWidth: 100,
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params) =>
                renderButtonSimple(
                    params.row.id,
                    params.row.status,
                    handleStatus,
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
            field: "submissionTime",
            headerName: "접수 시간",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 150,
        },
    ];
}
