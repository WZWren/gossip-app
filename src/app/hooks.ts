/**
* React-Redux has hooks, but they don't know the specifics for the application
* so it may be better to predefine our own hooks in each app.
**/
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
// useSelector is a function - we alias it by adding a type TypedUseSelector...
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// this files have the hooks with the right hook types.
// we need to import these instead in our components.