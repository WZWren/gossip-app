import React from 'react';

import Thread from '../types/Thread';
import ThreadUI from '../ui/thread-ui';
import ThreadPopup from '../ui/thread-popup';
import * as backend from '../backend-hooks';
import { persistentActions } from '../features/persistent-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const local_thread = useAppSelector((state) => state.persistent.localThread);

    function populateStore(threads: Thread[]) {
        dispatch(persistentActions.populate(threads))
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
    });

    return (
        <>
            <ThreadPopup />
            {local_thread.map(elem => (
                <ThreadUI key={elem.thread_id} {...elem}/>
            ))}
        </>
    );
};

export default Home;