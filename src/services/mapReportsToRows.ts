import type { Report } from "../types/reportTypes"; // Report 타입 정의
import dateFormat from "./dateFormating";
import { statusDisplayMap } from "../pages/admin/internals/data/gridData";

import type { GridRowsProp } from "@mui/x-data-grid";
import type { ReportStatus } from "types/reportStatus";

export function mapReportsToRows(reports: Report[]): GridRowsProp {
    return reports.map((report) => {
        const statusKey = report.status as ReportStatus;
        const config = statusDisplayMap[statusKey];

        return {
            id: report.reportId, // DataGrid 고유키 필수
            status: report.status,
            content: report.reviewContent,
            type: report.reason,
            reviewer: report.reportedNickname,
            reporter: report.reporterNickname,
            submissionTime: dateFormat(report.createdAt),

            // 추가 필드
            reportStatus: config.statusLabel,
            reportResult: config.resultLabel,
        };
    });
}
