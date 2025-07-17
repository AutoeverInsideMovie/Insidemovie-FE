import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { GridCellParams, GridRowsProp, GridColDef } from "@mui/x-data-grid";
type ReportStatus = "APPROVED" | "REJECTED" | "UNPROCESSED";
const statusDisplayMap: Record<
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
        resultColor: "success",
    },
    REJECTED: {
        statusLabel: "처리",
        resultLabel: "거부",
        statusColor: "default",
        resultColor: "error",
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
                    backgroundColor: "#fff9c4", // 연한 노랑 (파스텔톤)
                    border: "1px solid #D4AF37", // 보더 추가!
                    fontWeight: "bold",
                    boxShadow: "none",
                    "& .MuiChip-label": {
                        color: "#D4AF37", // 여기서 진짜 텍스트 색 지정
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

export const columns: GridColDef[] = [
    {
        field: "reportStatus",
        headerName: "처리 상태",
        headerAlign: "center",
        align: "center",
        flex: 0.5,
        minWidth: 80,
        renderCell: (params) => renderStatus(params.row.status as ReportStatus),
    },
    {
        field: "reportResult",
        headerName: "처리 결과",
        headerAlign: "center",
        align: "center",
        flex: 0.5,
        minWidth: 80,
        renderCell: (params) => renderResult(params.row.status as ReportStatus),
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
        renderCell: (params) => renderType(params.value as ReportType),
    },
    {
        field: "reviewer",
        headerName: "작성자",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 80,
    },

    {
        field: "reporter",
        headerName: "신고자",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
    },
    {
        field: "submissionTime",
        headerName: "접수 시간",
        headerAlign: "center",
        align: "center",
        flex: 1.5,
        minWidth: 150,
    },
];

export const rows: GridRowsProp = [
    {
        id: 1,
        status: "APPROVED",
        content: "에라이ㅋㅋㅋ 감독 접어라 쓰레기 영화",
        type: "INAPPROPRIATE_LANGUAGE",
        reporter: "선량한평론가",
        reviewer: "영화가싫다",
        submissionTime: "2025-07-15 09:30:00",
    },
    {
        id: 2,
        status: "APPROVED",
        content: "성적인 영화가 좋아요",
        type: "SEXUAL_CONTENT",
        reporter: "111111111",
        reviewer: "닉네임을입력하세요",
        submissionTime: "2025-06-20 14:45:00",
    },
    {
        id: 3,
        status: "REJECTED",
        content: "내 취향이랑은 안 맞는 듯",
        type: "RUDE_BEHAVIOR",
        reporter: "네다음영알못",
        reviewer: "영화는내인생",
        submissionTime: "2024-12-01 19:00:00",
    },
    {
        id: 4,
        status: "APPROVED",
        content: "이 영화 좋아하는 사람은 머리가 어떻게 됨?",
        type: "RUDE_BEHAVIOR",
        reporter: "신고가좋아",
        reviewer: "네다음영알못",
        submissionTime: "2025-01-10 08:15:00",
    },
    {
        id: 5,
        status: "APPROVED",
        content: "@@>>히어로즈 오브 더 스톰 지금 다운로드<<@@",
        type: "ADVERTISEMENT",
        reporter: "선량한평론가",
        reviewer: "시공조아",
        submissionTime: "2025-07-16 16:00:00",
    },

    {
        id: 6,
        status: "APPROVED",
        content: "절름발이가 범인임",
        type: "SPOILER",
        reporter: "아직안봤는데",
        reviewer: "난이미봤는데",
        submissionTime: "2025-07-16 23:15:00",
    },
    {
        id: 7,
        status: "UNPROCESSED",
        content: "ㄹ나ㅣ;ㅁㄹ;ㅓ",
        type: "RUDE_BEHAVIOR",
        reporter: "뭔데이건",
        reviewer: "1234",
        submissionTime: "2025-07-16 23:15:00",
    },
];

const mappedRows = rows.map((row) => {
    const config = statusDisplayMap[row.status as ReportStatus];
    return {
        ...row,
        reportStatus: config.statusLabel,
        reportResult: config.resultLabel,
    };
});

export default mappedRows;
