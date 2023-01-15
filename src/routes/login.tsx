import React from "react";
import {
    Box, Paper, Button, TextField, Typography,
    Checkbox, FormControlLabel, FormGroup
} from '@mui/material';
import { userActions } from "../features/user-slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import * as backend from "../backend-hooks";
import User from "../types/User";

const LoginPage: React.FC = () => {
    /**
     * we handle the state of some components locally for this instance -
     * there is no reason to communicate the state of the these components
     * with the rest of the app, as the request is directly posted to the
     * backend/locally.
     * */
    const [error_message, setMessage] = React.useState("");
    const [user_name, setUsername] = React.useState("");
    const [user_pass, setPassword] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

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
                navigate("/../home");
            } else {
                return response.json();
            }
        }).then((result) => {
            if (result != undefined)
                setMessage(result.message);
        });
    }

    if (isLoggedIn) {
        navigate("/../home");
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
                        disabled={isLoggedIn}>Go!</Button>
                </Box>
            </Paper>
        </>
    );
}

export default LoginPage;