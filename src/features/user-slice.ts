import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../types/User";
import { empty_user } from "../types/User";

/**
 * The user slice feature will only store 2 items for the app:
 * 1. Is the user logged in right now?
 * 2. Who is the user?
 * Password handling, etc will NOT be handled by the user slice.
 */

interface userState {
    isLoggedIn: boolean;
    user: User;
    loginAttemptListener: number;
}

const initialState: userState = {
    isLoggedIn: false,
    user: empty_user,
    loginAttemptListener: 0,
}

const userSlice = createSlice({
    name: "user_state",
    initialState,
    reducers: {
        user_login(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        user_logout(state) {
            state.user = empty_user;
            state.isLoggedIn = false;
        },
        // this is a primitive listener that changes in value when an
        // attempt to log in is made - this interacts with local hooks
        // for certain components to get them to run.
        user_login_attempted(state) {
            state.loginAttemptListener++;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;