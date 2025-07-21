import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Copyright(props: any) {
    const navigate = useNavigate();
    return (
        <Typography
            variant="body2"
            align="center"
            {...props}
            sx={[
                {
                    color: "text.secondary",
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        >
            {"Copyright © "}
            <Link
                color="inherit"
                component="button"
                onClick={() => navigate("/")}
                underline="hover"
            >
                InsideMovie
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
