/**
 * Same slice as thread-popup, but for new threads instead.
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Thread from "../types/Thread";
import { null_thread, is_empty_thread } from "../types/Thread";
import Cmmt from "../types/Comment";

interface newpopupState {
    isPopupOpen: boolean;
}

const initialState: newpopupState = {
    isPopupOpen: false,
}

const newthreadSlice = createSlice({
    name: "new_thread",
    initialState,
    reducers: {
        open_dialog(state) {
            state.isPopupOpen = true;
        },
        close_dialog(state) {
            state.isPopupOpen = false;
        },
    }
});

export const newthreadActions = newthreadSlice.actions;
export default newthreadSlice.reducer;