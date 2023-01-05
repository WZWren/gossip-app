import React from 'react';
import {
    Card, CardContent, CardActionArea, CardActions, Button, Typography
} from '@mui/material';
import Thread from '../types/Thread';

const ThreadUI: React.FC<Thread> = (thread: Thread) => {
    return (
        <Card sx={{ minWidth: 0.5 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {thread.thread_title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {thread.thread_body}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Help.
                </Button>
            </CardActions>
        </Card>
    );
};

export default ThreadUI;