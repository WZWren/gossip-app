import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Tab from "../types/Tab";
import { ActionTypes } from "@mui/base";

/**
 * This slice stores the Ignore list and the Bookmark list as
 * 2 separate integer arrays - the integers stored in the array
 * correspond directly to the thread_id, which will all be unique.
 */

interface settingsState {
    ignoreThreads: number[];
    bkmarkThreads: number[];
}

const initialState: settingsState = {
    ignoreThreads: [],
    bkmarkThreads: [],
}

const settingsSlice = createSlice({
    name: "settings_state",
    initialState,
    reducers: {
        populate(state, action: PayloadAction<Tab[]>) {
            const ignoreThreads = state.ignoreThreads;
            const bkmarkThreads = state.bkmarkThreads;
            action.payload.forEach(elem => {
                switch(elem.tab_type) {
                    case 1: // bookmark case
                        bkmarkThreads[bkmarkThreads.length] = elem.thread_id;
                        break;
                    case 2: // ignore case
                        ignoreThreads[ignoreThreads.length] = elem.thread_id;
                        break;
                    default:
                        console.log("User setting not found. Please contact admin.");
                        break;
                }
            });
        },
        depopulate(state) {
            state.ignoreThreads = [];
            state.bkmarkThreads = [];
        },
        // local reducers to alleviate the need to send a second fetch request
        // whenever a new tab setting is made.
        addIgnore(state, action: PayloadAction<number>) {
            state.ignoreThreads[state.ignoreThreads.length] = action.payload;
        },
        addBkmark(state, action: PayloadAction<number>) {
            state.bkmarkThreads[state.bkmarkThreads.length] = action.payload;
        },
        removeIgnore(state, action: PayloadAction<number>) {
            const findArrayIndex = state.ignoreThreads.indexOf(action.payload);
            if (findArrayIndex > -1) {
                state.ignoreThreads.splice(findArrayIndex, 1);
            } else {
                console.log("Thread not found. Please contact admin.");
            }
        },
        removeBkmark(state, action: PayloadAction<number>) {
            const findArrayIndex = state.bkmarkThreads.indexOf(action.payload);
            if (findArrayIndex > -1) {
                state.bkmarkThreads.splice(findArrayIndex, 1);
            } else {
                console.log("Thread not found. Please contact admin.");
            }
        }
    }
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;