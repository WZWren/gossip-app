import React from "react";
import {
    Box, Paper, Button, TextField, Typography,
    Checkbox, FormControlLabel, FormGroup
} from '@mui/material';
import { userActions } from "../features/user-slice";
import { redirect, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import * as backend from "../backend-hooks";
import User from "../types/User";

const RegisterPage: React.FC = () => {
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

    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await fetch(backend.RegisterBackend, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_name,
                user_pass
            })
        }).then((response) => {
            if (response.ok) {
                navigate("/../login");
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
                    <Button variant="contained" type="submit">Register</Button>
                </Box>
            </Paper>
        </>
    );
}

export default RegisterPage;