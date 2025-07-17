import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
// import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
// import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { useNavigate } from "react-router-dom";

const mainListItems = [
    { text: "Home", icon: <HomeRoundedIcon />, path: "/admin" },
    { text: "Members", icon: <PeopleRoundedIcon />, path: "/admin/member" },
    // { text: "Analytics", icon: <AnalyticsRoundedIcon /> },
    { text: "Reports", icon: <AssignmentRoundedIcon />, path: "/admin/report" },
    {
        text: "Settings",
        icon: <SettingsRoundedIcon />,
        path: "/admin/settings",
    },
];

// const secondaryListItems = [
//     { text: "Settings", icon: <SettingsRoundedIcon /> },
//     { text: "About", icon: <InfoRoundedIcon /> },
//     { text: "Feedback", icon: <HelpRoundedIcon /> },
// ];

export default function MenuContent() {
    const navigate = useNavigate();
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton
                            selected={index === 0}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/* <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Stack>
    );
}
