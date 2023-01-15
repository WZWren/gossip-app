import React from 'react';
import {
    Card, CardContent, CardActionArea, CardActions, Button, Typography
} from '@mui/material';
import Thread from '../types/Thread';
import dateToString from '../helpers/date-to-string';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { threadpopupActions } from '../features/thread-popup-slice';
import * as backend from "../backend-hooks";

const ThreadUI: React.FC<Thread> = (thread: Thread) => {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const dispatch = useAppDispatch();

    const handleOpen = async () => {
        await fetch(backend.GetCommentBackend, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                thread_id: thread.thread_id
            })
        }).then((response) => {
            return response.json();
        }).then((result) => {
            dispatch(threadpopupActions.populate(result));
        });
        dispatch(threadpopupActions.open_thread(thread));
    }

    return (
        <Card sx={{ width: 0.7, mb: 1 }}>
            <CardActionArea onClick={handleOpen}>
                <Typography
                    variant="overline"
                    color="text.secondary"
                    display="block"
                    align="center"
                >
                    Posted on {dateToString(thread.thread_date)} / 
                    Last updated {dateToString(thread.thread_upd)}
                </Typography>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {thread.thread_title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap={true}>
                        {thread.thread_body}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Comments ({thread.thread_cmmt_no})
                </Button>
                <Button size="small" color="primary" disabled={!isLoggedIn}>
                    Bookmark
                </Button>
                <Button size="small" color="primary" disabled={!isLoggedIn}>
                    Ignore
                </Button>
            </CardActions>
        </Card>
    );
};

export default ThreadUI;