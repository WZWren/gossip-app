import React from "react";
import {
    Box, Paper, Button, TextField, Typography,
    Checkbox, FormControlLabel, FormGroup
} from '@mui/material';

const LoginPage: React.FC = () => {
    /**
     * we handle the state of the checkbox locally for this instance -
     * there is no reason to communicate the state of the register action
     * with the rest of the app, as the request is directly posted to the
     * backend - this also saves the hassle of storing the password locally
     * into the state.
     * */
    const [register, setRegister] = React.useState(false);
    
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
                >
                    <Typography variant="h3" align="center" gutterBottom>
                        Sign in...
                    </Typography>
                    <TextField
                        id="username-field"
                        variant="outlined"
                        label="Username"
                        fullWidth
                        required
                    />
                    <TextField
                        id="password-field"
                        variant="outlined"
                        label="Password"
                        type="password"
                        fullWidth
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={register}
                                    onChange={e => setRegister(e.target.checked)}
                                />
                            }
                            label="Register for an account instead."
                        />
                    </FormGroup>
                    <Button variant="contained">Go!</Button>
                </Box>
            </Paper>
        </>
    );
}

export default LoginPage;