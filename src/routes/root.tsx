import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
    Box, Button, Typography, AppBar, createTheme, ThemeProvider,
    Toolbar
} from '@mui/material';
import { deepPurple } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: deepPurple["A400"],
        },
        secondary: {
            main: deepPurple[50],
        }
    }
});

const Root: React.FC = () => {
    const navigate = useNavigate();

    function handleHome() {
        navigate("/home");
    }
    function handleLogin() {
        navigate("/login");
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h1" align="center" marginTop={2} gutterBottom>
                Gossip!
            </Typography>
            <AppBar position="relative" sx={{marginBottom: 1}} color="primary">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button size="large" color="secondary" onClick={handleHome}>
                        Homepage
                    </Button>
                    <Box sx={{ flexGrow: 0.2 }} />
                    <Button size="large" color="secondary" disabled>
                        Bookmark
                    </Button>
                    <Box sx={{ flexGrow: 0.2 }} />
                    <Button size="large" color="secondary" disabled>
                        Ignored
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 1 }} >
                        <Button size="large" color="secondary" onClick={handleLogin}>
                            Sign in...
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
        </ThemeProvider>
    );
};

export default Root;