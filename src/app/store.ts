// configureStore is a wrapper for the basic Redux createStore function
// it auto sets up the Redux createStore stuff like...:
//		turns on dev tools/thunk middleware/development checks
// this 'class' or 'obj' is quite literally the storeroom of the program
// it holds the entirety of the state tree of the app inside this file
// as an app grows "the number of reducers increase"

// no {} for counterReducer as it is the default.

import { configureStore } from '@reduxjs/toolkit';
import threadpopupReducer from '../features/thread-popup-slice';
import userSliceReducer from '../features/user-slice';
import persistentReducer from '../features/persistent-slice';
import newthreadReducer from '../features/new-thread-slice';
import settingsReducer from '../features/user-settings-slice';

// configureStore combines reducers automatically when we pass in objects
export const store = configureStore({
	reducer: {
		thread_popup: threadpopupReducer,
		user: userSliceReducer,
		persistent: persistentReducer,
		new_thread: newthreadReducer,
		settings: settingsReducer
	},
});

// we take the store's dispatch function and ask TS what is the dispatch
// and we export that type as a type we can use
export type AppDispatch = typeof store.dispatch;

// TS has a built in type called ReturnType.
export type RootState = ReturnType<typeof store.getState>;