import React from 'react';

import { Button, Collapse } from '@mui/material';

import ThreadUI from '../ui/thread-ui';
import ThreadPopup from '../ui/thread-popup';
import { newthreadActions } from '../features/new-thread-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import NewThread from '../ui/new-thread';

/**
 * The homepage of the website. Consists of a button to handle new threads,
 * and all the threads in the database, sans the ignored threads that are
 * specified by the user.
 */
const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const localThread = useAppSelector((state) => state.persistent.localThread);
    const ignoredThreads = useAppSelector((state) => state.settings.ignoreThreads);

    function handleNewThread() {
        dispatch(newthreadActions.open_dialog());
    }

    return (
        <>
            <NewThread />
            <Collapse in={isLoggedIn}>
                <Button
                    variant="contained"
                    sx={{ marginBottom: 1 }}
                    disabled={!isLoggedIn}
                    onClick={handleNewThread}
                >
                    New Thread
                </Button>
            </Collapse>
            <ThreadPopup />
            {localThread.map(elem => {
                if (ignoredThreads.indexOf(elem.thread_id) == -1) {
                    return <ThreadUI key={elem.thread_id} {...elem}/>;
                }
            })}
        </>
    );
};

export default Home;