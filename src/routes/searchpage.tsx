import React from 'react';

import {  Paper, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import Thread from '../types/Thread';
import ThreadUI from '../ui/thread-ui';
import ThreadPopup from '../ui/thread-popup';
import * as backend from '../backend-hooks';

const Search: React.FC = () => {
    // search is its self contained module, so it does not need to interact with
    // the redux store.
    const [input, setInput] = React.useState("");
    const [fetchData, setFetchData] = React.useState<Thread[]>([]);

    React.useEffect(() => {
        // prevent the race condition.
        let isFetchDone = false;
        if (input == "") {
            setFetchData([]);
            return () => {
                isFetchDone = true;
            }
        }
        (
            async () => {
                await fetch(backend.SearchThreadBackend, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        search: input
                    })
                }).then((response) => response.json()).then((result) => {
                    if (result != undefined && !isFetchDone) {
                        setFetchData(result)
                    }
                })
            }
        )();
        // cleanup operation
        return () => {
            isFetchDone = true;
        }
    }, [input]);

    return (
        <>
            <Paper sx={{ width: 0.7, mb: 1 }}>
                <TextField
                    autoFocus
                    variant="outlined"
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1 }}/>,
                        style: {fontSize: "large"}
                    }}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Search title or body..."
                    fullWidth />
            </ Paper>
            <ThreadPopup />
            {fetchData.map(elem => (
                <ThreadUI key={elem.thread_id} {...elem}/>
            ))}
        </>
    );
};

export default Search;