import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Thread from "../types/Thread";

/**
 * This slice (mainly) handles the storage of the threads fetched from the backend.
 * Should there be additional data to store on the frontend, it will be done here.
 */

interface persistentState {
    localThread: Thread[];
    isHandlingPost: boolean;
}

const initialState: persistentState = {
    localThread: [],
    isHandlingPost: false,
}

const persistentSlice = createSlice({
    name: "persistent_state",
    initialState,
    reducers: {
        populate(state, action: PayloadAction<Thread[]>) {
            state.localThread = action.payload;
        },
        /**
         * locks certain functions of the frontend when running through fetches
         * */
        lock(state) {
            state.isHandlingPost = true;
        },
        unlock(state) {
            state.isHandlingPost = false;
        },
    }
});

export const persistentActions = persistentSlice.actions;

export default persistentSlice.reducer;