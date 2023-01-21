import React from 'react';

import {
    Dialog, DialogTitle, DialogActions, RadioGroup, Radio, FormLabel,
    FormControl, FormControlLabel, Button, Box, TextField, IconButton
} from '@mui/material';

import { Send } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { persistentActions } from '../features/persistent-slice';
import { newthreadActions } from '../features/new-thread-slice';
import * as backend from '../backend-hooks';

/**
 * Dialog for creating a new thread.
 * The title fields are compulsory. After posting, the backend is prompted to
 * refresh the threads.
 */
const NewThread: React.FC = () => {
    const isPopupOpen = useAppSelector((state) => state.new_thread.isPopupOpen);
    const isLocked = useAppSelector((state) => state.persistent.isHandlingPost);
    const currentUser = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();

    // create a local state to fetch the strings from the textbox
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");
    const [tag, setTag] = React.useState(0);

    function handleClose() {
        setTitle("");
        setBody("");
        dispatch(newthreadActions.close_dialog());
    }

    function handleTag(e: React.ChangeEvent<HTMLInputElement>) {
        switch(e.target.value) {
            case "none":
                setTag(0);
                break;
            case "work":
                setTag(1);
                break;
            case "play":
                setTag(2);
                break;
            default:
                setTag(0);
                break;
        }
    }

    async function handleNewThread(e: React.FormEvent<HTMLFormElement>) {
        // event prevented from posting.
        e.preventDefault();
        dispatch(persistentActions.lock());

        await fetch(backend.PostThreadBackend, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: currentUser.user_id,
                user_name: currentUser.user_name,
                tag_id: tag,
                thread_title: title,
                thread_body: body
            })
        });

        await fetch(backend.GetThreadBackend, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then((response) => response.json()).then((result) => {
            if (result != undefined)
                dispatch(persistentActions.populate(result));
        });

        dispatch(persistentActions.unlock());
        handleClose();
    }

    return (
        <>
        <Dialog
            open={isPopupOpen}
            onClose={handleClose}
            scroll="body"
            fullWidth
            maxWidth='lg'
        >
            <DialogTitle id="thread-title" variant="h3">
                Create a new thread...
            </DialogTitle>
            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button onClick={handleClose}>Discard</Button>
                <FormControl>
                    <FormLabel>Tag</FormLabel>
                    <RadioGroup
                        defaultValue="none"
                        onChange={e => handleTag(e)}
                        row
                    >
                        <FormControlLabel
                            value="none"
                            control={<Radio />}
                            label="None"
                        />
                        <FormControlLabel
                            value="work"
                            control={<Radio />}
                            label="Work"
                        />
                        <FormControlLabel
                            value="play"
                            control={<Radio />}
                            label="Play"
                        />
                    </RadioGroup>
                </FormControl>
            </DialogActions>
            <Box component="form" onSubmit={e => handleNewThread(e)} p={2}>
                <TextField
                    id="title"
                    placeholder="Title (Required)"
                    fullWidth
                    autoFocus
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    sx = {{ marginBottom: 1 }}
                />
                <TextField
                    id="body"
                    placeholder="Body"
                    multiline
                    rows={6}
                    fullWidth
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    InputProps={{
                        endAdornment:
                            <IconButton
                                aria-label="Submit"
                                type="submit"
                                disabled={
                                    !title.replace(/ *\n*/g,"") || isLocked
                                }
                            >
                                <Send/>
                            </IconButton>
                    }}
                />
            </Box>
        </Dialog>
        </>
    );
};

export default NewThread;