import type { GridValidRowModel } from "@mui/x-data-grid";

export const updateReportStatus = (
    reports: GridValidRowModel[],
    reportId: number,
    newStatus: string,
): GridValidRowModel[] => {
    return reports.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report,
    );
};
