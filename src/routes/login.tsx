import React from "react";

import {
    Box, Paper, Button, TextField, Typography
} from '@mui/material';
import { Navigate, useNavigate } from "react-router-dom";

import { userActions } from "../features/user-slice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import * as backend from "../backend-hooks";
import { persistentActions } from "../features/persistent-slice";

/**
 * The Login Page of the site. This page handles the login info of the user
 * and returns a HTTP-Only Cookie to the browser to preserve logins between
 * sessions.
 * 
 * A majority of this page does not implement Redux, as the page mostly
 * interacts with its own elements.
 */
const LoginPage: React.FC = () => {
    const [error_message, setMessage] = React.useState("");
    const [user_name, setUsername] = React.useState("");
    const [user_pass, setPassword] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const isLocked = useAppSelector((state) => state.persistent.isHandlingPost);

    /**
     * Handle the login request. If the login is OK, return a cookie.
     * Otherwise, it returns a error message that is displayed to the user
     * in the page.
     */
    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        dispatch(persistentActions.lock());
        await fetch(backend.LoginBackend, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                user_name,
                user_pass
            })
        }).then((response) => {
            if (response.ok) {
                dispatch(userActions.user_login_attempted());
                dispatch(persistentActions.unlock());
                navigate("/../home");
            } else {
                return response.json();
            }
        }).then((result) => {
            if (result != undefined)
                setMessage(result.message);
        });
        dispatch(persistentActions.unlock());
    }

    // the user should not be here if they are logged in.
    if (isLoggedIn) {
        return <Navigate to="/../home"/>;
    }

    return (
        <>
            <Paper sx={{ display: "flex", width: 0.7, justifyContent: "center" }}>
                <Box
                    component="form"
                    p={2} width={240}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        justifyContent:"center"
                    }}
                    onSubmit={e => handleLogin(e)}
                >
                    <Typography variant="h3" align="center" gutterBottom>
                        Sign in...
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        color="error.main"
                        gutterBottom
                    >
                        { error_message }
                    </Typography>
                    <TextField
                        id="username-field"
                        variant="outlined"
                        label="Username"
                        value={user_name}
                        onChange={e => setUsername(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        id="password-field"
                        variant="outlined"
                        label="Password"
                        value={user_pass}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        fullWidth
                        required
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoggedIn || isLocked}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </>
    );
}

export default LoginPage;