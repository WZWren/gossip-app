import { Outlet } from "react-router-dom";
import {
    Stack, Button, Typography
} from '@mui/material';

export default function Root() {
    return (
        <>
            <Typography variant="h1" align="center" gutterBottom>
                Gossip!
            </Typography>
            <Outlet />
        </>
    );
}