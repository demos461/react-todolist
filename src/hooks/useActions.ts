import {bindActionCreators} from "@reduxjs/toolkit";
import {appActions, appAsyncActions} from "../app/appSlice";
import {useAppDispatch} from "../app/store";
import {authActions, authAsyncActions} from "../features/Auth/authSlice";
import {todolistsActions, todolistsAsyncActions} from "../features/TodolistsList/todolistsSlice";
import {tasksAsyncActions} from "../features/TodolistsList/Todolist/Task/tasksSlice";

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators({
        ...appActions,
        ...appAsyncActions,
        ...authActions,
        ...authAsyncActions,
        ...todolistsAsyncActions,
        ...todolistsActions,
        ...tasksAsyncActions
    }, dispatch)
}