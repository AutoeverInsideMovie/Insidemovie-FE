import * as React from "react";
import {
    DataGrid,
    type GridRowsProp,
    type GridValidRowModel,
} from "@mui/x-data-grid";
import { getColumns } from "../internals/data/gridData";
import Box from "@mui/material/Box";

import { updateReportStatus } from "../../../services/reportHandler";
import { useState } from "react";
import { mapReportsToRows } from "../../../services/mapReportsToRows";
import mock from "../../../../public/mock/report.json";

interface ReportBoardProps {
    filtered?: boolean; // 필터 적용 여부
}

export default function ReportBoard({ filtered = false }: ReportBoardProps) {
    const rows: GridRowsProp = mapReportsToRows(mock);
    const [reportList, setReportList] = useState<GridValidRowModel[]>([
        ...rows,
    ]);

    const handleDelete = (reportId: number) => {
        const updated = updateReportStatus(reportList, reportId, "APPROVED");
        setReportList(updated);
    };

    const columns = getColumns(handleDelete);

    return (
        <Box sx={{ width: "100%" }}>
            <DataGrid
                rows={reportList}
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
                                sort: "desc", // 오름차순은 "asc"
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
                                        operator: "equals", // 연산자
                                        value: "UNPROCESSED", // 필터 값
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
