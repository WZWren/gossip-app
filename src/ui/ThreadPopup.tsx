import React from 'react';
import { Box, Modal, Button, Typography } from '@mui/material';
import Thread from '../types/Thread';

const ThreadPopup: React.FC<Thread> = (thread: Thread) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="thread-title"
            aria-describedby="thread-rest"
        >
            <Box sx={{ width: 0.85, height: 0.85 }}>
                <h1 id="thread-title">{thread.thread_title}</h1>
                <p id="thread-rest">{thread.thread_body}</p>
            </Box>
        </Modal>
        </>
    );
};

export default ThreadPopup;