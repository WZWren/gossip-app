import React from 'react';
import {
    Card, CardContent, CardActions, Button, Typography, Collapse, TextField
} from '@mui/material';
import dateToString from '../helpers/date-to-string';
import Cmmt from '../types/Comment';
import { useAppSelector } from '../app/hooks';
import * as backend from '../backend-hooks';

const CommentUI: React.FC<Cmmt> = (cmmt: Cmmt) => {
    // if you aren't logged in, the userid is 0, which isn't a valid userid.
    const currentUser = useAppSelector((state) => state.user.user);
    const isLocked = useAppSelector((state) => state.persistent.isHandlingPost);
    const isYourComment = (currentUser.user_id == cmmt.user_id);

    const [hide, setHide] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [edit, setEdit] = React.useState(cmmt.cmmt_body);

    async function handleDelete() {
        await fetch(backend.DelCommentBackend, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                cmmt_id: cmmt.cmmt_id
            })
        });
        setHide(true);
    }

    function handleEdit() {
        setHide(true);
        setIsEdit(true);
    }

    function handleDiscardEdit() {
        setEdit(cmmt.cmmt_body);
        setHide(false);
        setIsEdit(false);
    }

    async function handleEditConfirm() {
        await fetch(backend.UpdCommentBackend, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                cmmt_id: cmmt.cmmt_id,
                cmmt_body: edit
            })
        });
        setHide(false);
        setIsEdit(false);
    }

    return (
        <Card sx={{ mb: 1 }}>
            <Collapse in={!hide}>
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
                        {edit}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        disabled={!isYourComment}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        disabled={!isYourComment}
                        onClick={handleEdit}>
                        Edit
                    </Button>
                </CardActions>
            </Collapse>
            <Collapse in={isEdit}>
                <CardContent>
                    <TextField
                        id="user-comment"
                        placeholder="Body is required."
                        multiline
                        rows={6}
                        fullWidth
                        autoFocus
                        value={edit}
                        onChange={e => setEdit(e.target.value)}
                    />
                </CardContent>
            <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={handleDiscardEdit}
                    >
                        Discard Changes
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={handleEditConfirm}
                        disabled={
                            !edit.replace(/ *\n*/g,"") || isLocked
                        }
                    >
                        Confirm Edit
                    </Button>
                </CardActions>
            </Collapse>
        </Card>
    );
}

export default CommentUI;