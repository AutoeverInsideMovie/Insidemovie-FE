import * as React from "react";
import {
    DataGrid,
    type GridRowsProp,
    type GridValidRowModel,
} from "@mui/x-data-grid";
import { getColumns } from "../internals/data/gridData";
import Box from "@mui/material/Box";
import { updateReportStatus } from "../../../services/reportHandler";
import { useEffect, useState } from "react";
import { mapReportsToRows } from "../../../services/mapReportsToRows";
import axios from "axios";
import type { Report } from "../../../types/reportTypes"; // Report 타입 정의
interface ReportBoardProps {
    filtered?: boolean; // 필터 적용 여부(미처리만 보여주기)
}

export default function ReportBoard({ filtered = false }: ReportBoardProps) {
    const [reportList, setReportList] = useState<Report[] | null>(null);
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        console.log("토큰 : ", token);
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8080/api/v1/admin/reports?page=0&size=10",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                    // "/mock/report.json",
                );
                setReportList(res.data.content);
            } catch (err) {
                console.error("신고 페이지 데이터 불러오기 실패:", err);
            }
        };
        fetchData();
    }, []);
    const rows: GridRowsProp = mapReportsToRows(reportList);

    const handleDelete = (reportId: number) => {
        const updated = reportList?.map((r) =>
            r.reportId === reportId ? { ...r, status: "APPROVED" } : r,
        );
        setReportList(updated);
    };

    const columns = getColumns(handleDelete);
    if (!reportList) {
        return <div className="text-white text-center">Loading...</div>;
    }
    return (
        <Box sx={{ width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            status: false,
                        },
                    },
                    sorting: {
                        sortModel: [
                            {
                                field: "submissionTime",
                                sort: "desc",
                            },
                        ],
                    },
                    pagination: { paginationModel: { pageSize: 20 } },
                    ...(filtered && {
                        filter: {
                            filterModel: {
                                items: [
                                    {
                                        field: "status",
                                        operator: "equals",
                                        value: "UNPROCESSED",
                                    },
                                ],
                            },
                        },
                    }),
                }}
                pageSizeOptions={[10, 20, 50]}
                disableColumnResize
                density="compact"
                slotProps={{
                    filterPanel: {
                        filterFormProps: {
                            logicOperatorInputProps: {
                                variant: "outlined",
                                size: "small",
                            },
                            columnInputProps: {
                                variant: "outlined",
                                size: "small",
                                sx: { mt: "auto" },
                            },
                            operatorInputProps: {
                                variant: "outlined",
                                size: "small",
                                sx: { mt: "auto" },
                            },
                            valueInputProps: {
                                InputComponentProps: {
                                    variant: "outlined",
                                    size: "small",
                                },
                            },
                        },
                    },
                }}
            ></DataGrid>
        </Box>
    );
}
