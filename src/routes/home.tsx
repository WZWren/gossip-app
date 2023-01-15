import React from 'react';

import Thread from '../types/Thread';
import ThreadUI from '../ui/thread-ui';
import ThreadPopup from '../ui/thread-popup';
import * as backend from '../backend-hooks';
import { persistentActions } from '../features/persistent-slice';
import { newthreadActions } from '../features/new-thread-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Button, Collapse } from '@mui/material';
import NewThread from '../ui/new-thread';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const local_thread = useAppSelector((state) => state.persistent.localThread);

    function populateStore(threads: Thread[]) {
        dispatch(persistentActions.populate(threads));
    }

    function handleNewThread() {
        dispatch(newthreadActions.open_dialog());
    }
    // fetches the threads from the backend
    React.useEffect(() => {
        (
            async () => {
                await fetch(backend.GetThreadBackend, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                }).then((response) => response.json()).then((result) => {
                    if (result != undefined) {
                        populateStore(result);
                    }
                })
            }
        )();
    }, []);

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
            {local_thread.map(elem => (
                <ThreadUI key={elem.thread_id} {...elem}/>
            ))}
        </>
    );
};

export default Home;