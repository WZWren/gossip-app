import React from 'react';

import {
    Card, CardContent, CardActionArea, CardActions, Button, Typography
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { threadpopupActions } from '../features/thread-popup-slice';
import * as backend from "../backend-hooks";
import { settingsActions } from '../features/user-settings-slice';
import Thread from '../types/Thread';
import dateToString from '../helpers/date-to-string';

const TAG_TYPE: string[] = ["None", "Work", "Play"];

/**
 * The Card UI of each individual thread. Each thread can be interacted with
 * to bring up a Dialog of a thread.
 * @param thread, the thread passed in by Redux or React hooks
 */
const ThreadUI: React.FC<Thread> = (thread: Thread) => {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const isIgnore = useAppSelector((state) => state.settings.ignoreThreads)
        .indexOf(thread.thread_id) != -1;
    const isBkmark = useAppSelector((state) => state.settings.bkmarkThreads)
        .indexOf(thread.thread_id) != -1;
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();

    // Opens the Dialog modal. Close is handled on the popup instance.
    async function handleOpen() {
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

    /**
     * Adds/Removes the bookmark to the list of bookmarks. To minimize fetching
     * we also use the local dispatch instead of fetching the tabs again.
     */
    async function handleBookmark() {
        if (isIgnore) {
            console.log("You cannot bookmark an ignored thread!");
        } else if (!isBkmark) { // bookmark if it isn't bookmarked.
            await fetch(backend.PostTabsBackend, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user_id: user.user_id,
                    thread_id: thread.thread_id,
                    tab_type: 1,
                })
            })
            dispatch(settingsActions.addBkmark(thread.thread_id));
        } else if (isBkmark) { // remove the bookmark if it is.
            await fetch(backend.DeleteTabsBackend, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user_id: user.user_id,
                    thread_id: thread.thread_id,
                    tab_type: 1,
                })
            })
            dispatch(settingsActions.removeBkmark(thread.thread_id));
        }
    }

    /**
     * Adds/Removes the ignore. To minimize fetching
     * we also use the local dispatch instead of fetching the tabs again.
     */
    async function handleIgnore() {
        if (isBkmark) {
            console.log("You cannot ignore a bookmarked thread!");
        } else if (!isIgnore) { // ignore if not ignored
            await fetch(backend.PostTabsBackend, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user_id: user.user_id,
                    thread_id: thread.thread_id,
                    tab_type: 2,
                })
            })
            dispatch(settingsActions.addIgnore(thread.thread_id));
        } else if (isIgnore) { // remove the ignore if it is.
            await fetch(backend.DeleteTabsBackend, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user_id: user.user_id,
                    thread_id: thread.thread_id,
                    tab_type: 2,
                })
            })
            dispatch(settingsActions.removeIgnore(thread.thread_id));
        }
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
                <Typography
                    color="info.main"
                    align="right"
                    ml={2}
                    mr={2}
                >
                    Tags: {TAG_TYPE[thread.tag_id]}
                </Typography>
                <Button size="small" color="primary" onClick={handleOpen}>
                    Comments ({thread.thread_cmmt_no})
                </Button>
                <Button 
                    size="small"
                    color="primary"
                    onClick={handleBookmark}
                    disabled={!isLoggedIn || isIgnore}
                >
                    {isBkmark ? "Remove Bookmark" : "Bookmark"}
                </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={handleIgnore}
                    disabled={!isLoggedIn || isBkmark}
                >
                    {isIgnore ? "Stop Ignoring" : "Ignore"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default ThreadUI;