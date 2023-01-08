import React from 'react';
import thread_list from '../thread_list.json';
import Thread from '../types/Thread';

import ThreadUI from '../ui/ThreadUI';

const Home: React.FC = () => {
    const local_thread: Thread[] = thread_list.thread;
    console.log(local_thread);
    return (
        <>
            {local_thread.map(elem => (
                <ThreadUI key={elem.thread_id} {...elem}/>
            ))}
        </>
    );
};

export default Home;