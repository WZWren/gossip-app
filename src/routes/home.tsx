import React from 'react';
import thread_list from '../thread_list.json';
import Thread from '../types/Thread';

import ThreadUI from '../ui/thread-ui';
import ThreadPopup from '../ui/thread-popup';

const Home: React.FC = () => {
    const local_thread: Thread[] = thread_list.thread;
    console.log(local_thread);
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