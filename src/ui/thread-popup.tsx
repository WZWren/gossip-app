import React from 'react';
import {
    Dialog, Typography, DialogTitle, DialogContent, Collapse,
    DialogActions, Button, Box, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { threadpopupActions } from '../features/thread-popup-slice';
import { persistentActions } from '../features/persistent-slice';
import CommentUI from './comment-ui';
import dateToString from '../helpers/date-to-string';
import * as backend from '../backend-hooks';
import { default as Thread, is_empty_thread } from '../types/Thread';
import Cmmt from '../types/Comment';

const ThreadPopup: React.FC = () => {
    const thread = useAppSelector((state) => state.thread_popup.thread);
    const isPopupOpen = useAppSelector((state) => state.thread_popup.isPopupOpen);
    const cmmt_list = useAppSelector((state) => state.thread_popup.cmmt_list);
    const isLocked = useAppSelector((state) => state.persistent.isHandlingPost);
    const isReplyOpen =
        useAppSelector((state) => state.thread_popup.isReplyBoxOpen);
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const currentUser = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();

    // create a local state to fetch the comment string from the textbox
    const [comment, setComment] = React.useState("");

    function handleClose() {
        dispatch(threadpopupActions.close_thread());
    }

    function handleOpenReply() {
        dispatch(threadpopupActions.open_reply_box());
    }

    function handleCloseReply() {
        dispatch(threadpopupActions.close_reply_box());
    }

    async function handleNewCmmt(e: React.FormEvent<HTMLFormElement>) {
        // event prevented from posting.
        e.preventDefault();
        dispatch(persistentActions.lock());

        await fetch(backend.PostCommentBackend, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: currentUser.user_id,
                thread_id: thread.thread_id,
                cmmt_body: comment
            })
        });
        
        setComment("");
        dispatch(threadpopupActions.close_reply_box());

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
        dispatch(persistentActions.unlock());
    }

    /**
     * !comment.replace returns false if it only consists of whitespace
     */
    return (
        <>
        <Dialog
            open={isPopupOpen}
            onClose={handleClose}
            scroll="body"
            fullWidth
            maxWidth='lg'
        >
            <DialogTitle id="thread-title" variant="h3" align="center">
                    {thread.thread_title}
                </DialogTitle>
                <Typography align="center" id="thread-rest"
                    variant="h6" component="p" gutterBottom
                >
                    {thread.thread_body}
                </Typography>
                <Typography align="center" id="thread-rest"
                    variant="overline" component="p" gutterBottom
                >
                    By user: {thread.user_id} / 
                    Posted on {dateToString(thread.thread_date)} / 
                    Last updated {dateToString(thread.thread_upd)}
                </Typography>
                <DialogContent dividers>
                    <DialogActions sx={{ justifyContent: "space-between" }}>
                        <Button onClick={handleClose}>Close</Button>
                        {isReplyOpen ? (
                            <Button onClick={handleCloseReply}>
                                Discard reply...
                            </Button>
                        ) : (
                            <Button onClick={handleOpenReply} disabled={!isLoggedIn}>
                                Type a reply...
                            </Button>
                        )}
                    </DialogActions>
                    <Collapse in={ isReplyOpen && isLoggedIn }>
                        <Box component="form" onSubmit={e => handleNewCmmt(e)}>
                            <TextField
                                id="user-comment"
                                placeholder="Leave a comment!"
                                multiline
                                rows={6}
                                fullWidth
                                autoFocus
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                InputProps={{
                                    endAdornment:
                                        <IconButton
                                            aria-label="Reply"
                                            type="submit"
                                            disabled={
                                                !comment.replace(/ *\n*/g,"") || isLocked
                                            }
                                        >
                                            <Send/>
                                        </IconButton>
                                }}
                            />
                        </Box>
                    </Collapse>
                </DialogContent>
                {cmmt_list.map(elem => (
                    <CommentUI key={elem.cmmt_id} {...elem}/>
                ))}
        </Dialog>
        </>
    );
};

export default ThreadPopup;