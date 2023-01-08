import React from 'react';
import {
    Card, CardContent, CardActionArea, CardActions, Button, Typography, Box, Modal
} from '@mui/material';
import ThreadPopup from './thread-popup';
import Thread from '../types/Thread';

const ThreadUI: React.FC<Thread> = (thread: Thread) => {
    return (
        <Card sx={{ width: 0.7, mb: 1 }}>
            <CardActionArea>
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
                <ThreadPopup {...thread} />
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