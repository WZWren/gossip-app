import React from 'react';

import {
    Box,
    FormControl, FormControlLabel, FormLabel, Paper,
    Radio, RadioGroup, TextField
} from '@mui/material';
import { Search as SearchIcon, Tag } from '@mui/icons-material';

import Thread from '../types/Thread';
import ThreadUI from '../ui/thread-ui';
import ThreadPopup from '../ui/thread-popup';
import * as backend from '../backend-hooks';

const Search: React.FC = () => {
    // search is its self contained module, so it does not need to interact with
    // the redux store.
    const [input, setInput] = React.useState("");
    const [fetchData, setFetchData] = React.useState<Thread[]>([]);
    const [tag, setTag] = React.useState(0);

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

    React.useEffect(() => {
        // prevent the race condition.
        let isFetchDone = false;
        // if there isn't any input, do not fetch.
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
                        query: input,
                        tag_id: tag,
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
    }, [input, tag]);

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
            <Paper
                sx={{
                    width: 0.7,
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <FormControl margin="normal">
                    <FormLabel>Tags</FormLabel>
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
            </ Paper>
            <ThreadPopup />
            {fetchData.map(elem => (
                <ThreadUI key={elem.thread_id} {...elem}/>
            ))}
        </>
    );
};

export default Search;