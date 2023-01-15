import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
    Box, Button, Typography, AppBar, createTheme, ThemeProvider,
    Toolbar, Fade
} from '@mui/material';
import { deepPurple } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userActions } from "../features/user-slice";
import * as backend from "../backend-hooks";
import User from "../types/User";

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
    const loginAttempted = useAppSelector((state) => state.user.loginAttemptListener);
    const user = useAppSelector((state) => state.user.user);

    function handleHomeNav() {
        navigate("/home");
    }
    function handleLoginNav() {
        navigate("/login");
    }
    function handleRegisterNav() {
        navigate("/register");
    }
    function handleLogin(user: User) {
        dispatch(userActions.user_login(user));
    }
    async function handleLogout() {
        await fetch(backend.LogoutBackend, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        });
        dispatch(userActions.user_logout());
    }

    React.useEffect(() => {
        (
            async () => {
                await fetch(backend.AuthBackend, {
                    headers: {"Content-Type": "application/json"},
                    credentials: "include",
                }).then((response) => response.json()).then((result) => {
                    if (result.message == undefined) {
                        handleLogin(result);
                    }
                })
            }
        )();
    }, [loginAttempted]);

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h1" align="center" marginTop={2} gutterBottom>
                Gossip!
            </Typography>
            <AppBar position="relative" sx={{marginBottom: 1}} color="primary">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button size="large" color="secondary" onClick={handleHomeNav}>
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
                    <Box sx={{ flexGrow: 0.5, display: "flex", alignItems: "center" }}>
                        <Fade in={isLoggedIn}>
                            <Typography variant="body2">
                                { "Welcome, " + user.user_name }
                            </Typography>
                        </Fade>
                    </Box>
                    <Box sx={{ flexGrow: 0.5, display: "flex", alignItems: "center" }}>
                        <Button
                            size="large"
                            color="secondary"
                            onClick={ isLoggedIn ? handleLogout : handleLoginNav }
                        >
                            { isLoggedIn ? "Logout?" : "Login..." }
                        </Button>
                        <Fade in={!isLoggedIn}>
                            <Button
                                size="large"
                                color="secondary"
                                hidden={isLoggedIn}
                                onClick={handleRegisterNav}
                            >
                                Register
                            </Button>
                        </Fade>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
        </ThemeProvider>
    );
};

export default Root;