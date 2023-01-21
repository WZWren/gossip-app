import React from "react";

import {
    Box, Paper, Button, TextField, Typography
} from '@mui/material';
import { Navigate, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import * as backend from "../backend-hooks";
import { persistentActions } from "../features/persistent-slice";

/**
 * The Register Page of the site. This page handles the registration of
 * a new user. On successful registration, the user is redirected to the
 * login page.
 * 
 * A majority of this page does not implement Redux, as the page mostly
 * interacts with its own elements.
 */
const RegisterPage: React.FC = () => {
    const [error_message, setMessage] = React.useState("");
    const [user_name, setUsername] = React.useState("");
    const [user_pass, setPassword] = React.useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const isLocked = useAppSelector((state) => state.persistent.isHandlingPost);

    /**
     * Handle the register request. On success, redirect to the login.
     * Otherwise, it displays an error message for the user to see on the page.
     */
    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        dispatch(persistentActions.lock());
        await fetch(backend.RegisterBackend, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_name,
                user_pass
            })
        }).then((response) => {
            if (response.ok) {
                dispatch(persistentActions.unlock());
                navigate("/../login");
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
                    onSubmit={e => handleRegister(e)}
                >
                    <Typography variant="h3" align="center" gutterBottom>
                        Register
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        color="error.main"
                        gutterBottom
                    >
                        {error_message}
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
                        Register
                    </Button>
                </Box>
            </Paper>
        </>
    );
}

export default RegisterPage;