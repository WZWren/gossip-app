/**
 * The thread-popup-slice creates the states for the popup to generate
 * when the thread card element is pressed.
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Thread from "../types/Thread";
import { null_thread, is_empty_thread } from "../types/Thread";
import Cmmt from "../types/Comment";
// placeholder JSON for testing purposes
import cmmt_list from '../cmmt_list.json';

interface popupState {
    isPopupOpen: boolean;
    isReplyBoxOpen: boolean;
    thread: Thread;
    cmmt_list: Cmmt[];
}

const initialState: popupState = {
    isPopupOpen: false,
    isReplyBoxOpen: false,
    thread: null_thread,
    cmmt_list: []
}

const thread_popupSlice = createSlice({
    name: "thread_popup",
    initialState,
    reducers: {
        /**
         * opens the thread popup, initializes its elements and temporarily
         * holding onto the thread and comment data for the popup.
         * @TODO: in the final product, the comment list will be fetched here.
         * */
        open_thread(state, action: PayloadAction<Thread>) {
            // note to self: the mutation here only works because of redux toolkit
            // due to the Immer library.
            state.thread = action.payload;
            state.isPopupOpen = true;
            state.cmmt_list = cmmt_list.comment;
        },
        /**
         * closes the thread popup, resetting its variables internally.
         * */
        close_thread(state) {
            state.isPopupOpen = false;
            state.isReplyBoxOpen = false;
            state.thread = null_thread;
            state.cmmt_list = [];
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
         * @TODO: Implement comment handling in the backend.
         */
        add_comment(state, action: PayloadAction<Cmmt>) {
            state.cmmt_list.push(action.payload);
            state.isReplyBoxOpen = false;
        },
    }
});

export const {
    open_thread, close_thread,
    open_reply_box, close_reply_box, add_comment } = thread_popupSlice.actions;
export default thread_popupSlice.reducer;