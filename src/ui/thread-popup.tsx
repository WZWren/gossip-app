import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import Thread from '../types/Thread';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { close_thread } from '../features/thread-popup-slice';

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 0.8,
    bgcolor: 'text.primary',
    boxShadow: 15,
    p: 4,
};

const ThreadPopup: React.FC = () => {
    const thread = useAppSelector((state) => state.thread_popup.thread);
    const isOpen = useAppSelector((state) => state.thread_popup.isPopupOpen);
    const dispatch = useAppDispatch();

    function handleClose(event: {}, reason: "backdropClick" | "escapeKeyDown") {
        if (reason === "backdropClick") {
            console.log(reason);
        } else {
            dispatch(close_thread());
        }
    }

    return (
        <>
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="thread-title"
            aria-describedby="thread-rest"
        >
            <Box sx={style}>
                <Typography id="thread-title" variant="h3" gutterBottom>
                    {thread.thread_title}
                </Typography>
                <Typography
                    id="thread-rest" variant="h6" component="p" gutterBottom
                >
                    {thread.thread_body}
                </Typography>
            </Box>
        </Modal>
        </>
    );
};

export default ThreadPopup;