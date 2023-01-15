import React from 'react';
import {
    Card, CardContent, CardActions, Button, Typography
} from '@mui/material';
import dateToString from '../helpers/date-to-string';
import Cmmt from '../types/Comment';

const CommentUI: React.FC<Cmmt> = (cmmt: Cmmt) => {
    return (
        <Card sx={{ mb: 1 }}>
                <Typography
                    variant="overline"
                    color="text.secondary"
                    display="block"
                    align="center"
                >
                    Posted on {dateToString(cmmt.cmmt_date)} / 
                    Last updated {dateToString(cmmt.cmmt_upd)}
                </Typography>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {cmmt.user_id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {cmmt.cmmt_body}
                    </Typography>
                </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Delete
                </Button>
                <Button size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}

export default CommentUI;