import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from "react-router-dom";
import ThreadPopup from '../ui/thread-popup';
import ThreadUI from '../ui/thread-ui';
import { Paper, Typography } from '@mui/material';

const BookmarkPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const localThread = useAppSelector((state) => state.persistent.localThread);
    const bkmarkThreads = useAppSelector((state) => state.settings.bkmarkThreads);

    // the user should not be on this page if they aren't logged in.
    if (!isLoggedIn) {
        navigate("/../home");
    }

    return (
        <>
            <ThreadPopup />
            {(bkmarkThreads.length == 0)
                ?   (
                    <Paper 
                        sx={{
                            display: "flex",
                            width: 0.7,
                            mb: 1,
                            p: 2,
                            justifyContent: "center"
                            }}
                    >
                        <Typography gutterBottom variant="h2" component="div">
                            You have no bookmarks.
                        </Typography>
                    </Paper>
                    )
                :   localThread.map(elem => {
                       if (bkmarkThreads.indexOf(elem.thread_id) > -1) {
                           return <ThreadUI key={elem.thread_id} {...elem}/>;
                       }
                    })}
        </>
    );
};

export default BookmarkPage;