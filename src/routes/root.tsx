import React from "react";

import { Outlet, useNavigate } from "react-router-dom";
import {
    Box, Button, Typography, AppBar, createTheme, ThemeProvider,
    Toolbar, Fade, IconButton
} from '@mui/material';
import { Search as SearchIcon, Refresh } from "@mui/icons-material";
import { deepPurple } from "@mui/material/colors";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userActions } from "../features/user-slice";
import { settingsActions } from "../features/user-settings-slice";
import * as backend from "../backend-hooks";
import User from "../types/User";
import Tab from "../types/Tab";
import { persistentActions } from "../features/persistent-slice";
import Thread from "../types/Thread";

// overwrite the basic theme of MUI for certain elements.
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

/**
 * The Root of the Website. This consists of the NavBar, which houses the
 * Search, Homepage, Bookmark and Ignored Navigation buttons, as well as 
 * User Login and Logout info.
 * 
 * Additionally, the root initializes the threads, user persisted logins
 * and user tagged threads for bookmark and ignored.
 */
const Root: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const loginAttempted = useAppSelector((state) => state.user.loginAttemptListener);
    const user = useAppSelector((state) => state.user.user);

    function populateStore(threads: Thread[]) {
        dispatch(persistentActions.populate(threads));
    }

    // When the homepage is pressed, refresh the threads as well.
    async function handleHomeNav() {
        await fetch(backend.GetThreadBackend, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then((response) => response.json()).then((result) => {
            if (result != undefined) {
                populateStore(result);
            }
        })
        navigate("/home");
    }
    function handleLoginNav() {
        navigate("/login");
    }
    function handleRegisterNav() {
        navigate("/register");
    }
    function handleBookmarkNav() {
        navigate("/bookmark");
    }
    function handleIgnoreNav() {
        navigate("/ignore");
    }
    function handleSearchNav() {
        navigate("/searchpage");
    }
    function handleLogin(user: User) {
        dispatch(userActions.user_login(user));
    }
    // when the user is logged out, clear the bookmarks/ignores as well.
    async function handleLogout() {
        await fetch(backend.LogoutBackend, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        });
        dispatch(userActions.user_logout());
        dispatch(settingsActions.depopulate());
    }
    function handleTabs(tabs: Tab[]) {
        dispatch(settingsActions.populate(tabs));
    }

    // checks if a cookie exists. if it does, gets the user owning the cookie. 
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

    // checks if the user is logged in. If they are, init the bookmarks and
    // ignores.
    React.useEffect(() => {
        (
            async () => {
                if (isLoggedIn) {
                    await fetch(backend.GetTabsBackend, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            user_id: user.user_id,
                        })
                    }).then((response) => response.json()).then((result) => {
                        if (result.message == undefined) {
                            handleTabs(result);
                        }
                    })
                }
            }
        )();
    }, [isLoggedIn]);

    // fetches the threads from the backend
    React.useEffect(() => {
        (
            async () => {
                await fetch(backend.GetThreadBackend, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                }).then((response) => response.json()).then((result) => {
                    if (result != undefined) {
                        populateStore(result);
                    }
                })
            }
        )();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h1" align="center" marginTop={2} gutterBottom>
                Gossip!
            </Typography>
            <AppBar position="relative" sx={{marginBottom: 1}} color="primary">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton 
                        size="large"
                        color="secondary"
                        onClick={handleSearchNav}
                    >
                        <SearchIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 0.2 }} />
                    <Button size="large" color="secondary" onClick={handleHomeNav}>
                        <Refresh sx={{ mr: 1 }} />
                        Homepage
                    </Button>
                    <Box sx={{ flexGrow: 0.2 }} />
                    <Button 
                        size="large"
                        color="secondary"
                        onClick={handleBookmarkNav}
                        disabled={!isLoggedIn}>
                        Bookmark
                    </Button>
                    <Box sx={{ flexGrow: 0.2 }} />
                    <Button  
                        size="large"
                        color="secondary"
                        onClick={handleIgnoreNav}
                        disabled={!isLoggedIn}>
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