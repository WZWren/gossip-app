import React from 'react';
import {
    Card, CardContent, CardActionArea, CardActions, Button, Typography
} from '@mui/material';
import Thread from '../types/Thread';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { open_thread } from '../features/thread-popup-slice';

const ThreadUI: React.FC<Thread> = (thread: Thread) => {
    const isOpen = useAppSelector((state) => state.thread_popup.isPopupOpen);
    const dispatch = useAppDispatch();

    const handleOpen = () => {
        dispatch(open_thread(thread));
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
                    Posted on {thread.thread_date} / 
                    Last updated {thread.thread_upd}
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
                <Button size="small" color="primary">
                    Bookmark
                </Button>
                <Button size="small" color="primary">
                    Ignore
                </Button>
            </CardActions>
        </Card>
    );
};

export default ThreadUI;