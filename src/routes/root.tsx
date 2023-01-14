import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
    Box, Button, Typography, AppBar, createTheme, ThemeProvider,
    Toolbar
} from '@mui/material';
import { deepPurple } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userActions } from "../features/user-slice";

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
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const user = useAppSelector((state) => state.user.user);

    function handleHome() {
        navigate("/home");
    }
    function handleLogin() {
        navigate("/login");
    }
    function handleLogout(): void {
        dispatch(userActions.user_logout());
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
                    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                        <Typography variant="body2"> {
                            isLoggedIn ? "Welcome, " + user.user_name
                                       : ""
                        } </Typography>
                        <Button
                            size="large"
                            color="secondary"
                            onClick={ isLoggedIn ? handleLogout : handleLogin }
                        >
                            { isLoggedIn ? "Log out?" : "Sign in..." }
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
        </ThemeProvider>
    );
};

export default Root;