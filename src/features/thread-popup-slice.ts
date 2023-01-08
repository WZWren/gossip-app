/**
 * The thread-popup-slice creates the states for the popup to generate
 * when the thread card element is pressed.
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Thread from "../types/Thread";
import { null_thread, is_empty_thread } from "../types/Thread";

interface popupState {
    isPopupOpen: boolean;
    thread: Thread;
}

const initialState: popupState = {
    isPopupOpen: false,
    thread: null_thread,
}

const thread_popupSlice = createSlice({
    name: "thread_popup",
    initialState,
    reducers: {
        open_thread(state, action: PayloadAction<Thread>) {
            // note to self: the mutation here only works because of redux toolkit
            // due to the Immer library.
            state.isPopupOpen = true;
            state.thread = action.payload;
        },
        close_thread(state) {
            state.isPopupOpen = false;
            state.thread = null_thread;
        },
    }
});

export const { open_thread, close_thread } = thread_popupSlice.actions;
export default thread_popupSlice.reducer;