/**
 * The thread-popup-slice creates the states for the popup to generate
 * when the thread card element is pressed.
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Thread from "../types/Thread";
import { null_thread } from "../types/Thread";
import Cmmt from "../types/Comment";

interface threadpopupState {
    isPopupOpen: boolean;
    isReplyBoxOpen: boolean;
    thread: Thread;
    cmmt_list: Cmmt[];
}

const initialState: threadpopupState = {
    isPopupOpen: false,
    isReplyBoxOpen: false,
    thread: null_thread,
    cmmt_list: []
}

const threadpopupSlice = createSlice({
    name: "thread_popup",
    initialState,
    reducers: {
        /**
         * opens the thread popup, initializes its elements and temporarily
         * holding onto the thread and comment data for the popup.
         * */
        open_thread(state, action: PayloadAction<Thread>) {
            // note to self: the mutation here only works because of redux toolkit
            // due to the Immer library.
            state.thread = action.payload;
            state.isPopupOpen = true;
        },
        /**
         * populates the comment array with the fetched list from the backend.
         * */
        populate(state, action: PayloadAction<Cmmt[]>) {
            state.cmmt_list = action.payload;
        },
        /**
         * closes the thread popup, resetting its variables internally.
         * */
        close_thread(state) {
            state.isPopupOpen = false;
            state.isReplyBoxOpen = false;
            // Thinking about it, there isn't a need to depopulate a thread.
            // state.thread = null_thread;
            // state.cmmt_list = [];
        },
        /**
         * open and close reply box takes care of the button state of the popup
         * to open and close the reply box when interacted with.
         * */
        open_reply_box(state) {
            state.isReplyBoxOpen = true;
        },
        close_reply_box(state) {
            state.isReplyBoxOpen = false;
        },
        /**
         * add_comment will handle the addition of comments to the thread.
         */
        add_comment(state, action: PayloadAction<Cmmt>) {
            state.cmmt_list.push(action.payload);
            state.isReplyBoxOpen = false;
        },
    }
});

export const threadpopupActions = threadpopupSlice.actions;
export default threadpopupSlice.reducer;