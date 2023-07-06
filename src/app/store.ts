import {tasksReducer} from '../features/TodolistsList/Todolist/Task/tasksSlice';
import {todolistsReducer} from '../features/TodolistsList/todolistsSlice';
import {appReducer} from './appSlice'
import {authReducer} from "../features/Auth/authSlice";
import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from 'redux'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
});

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
