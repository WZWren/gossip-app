/**
 * Same slice as thread-popup, but for new threads instead.
 */

import { createSlice } from "@reduxjs/toolkit";

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