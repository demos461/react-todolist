import {tasksReducer} from '../features/TodolistsList/tasksSlice';
import {todolistsReducer} from '../features/TodolistsList/todolistsSlice';
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './appSlice'
import {authReducer} from "../features/Login/authSlice";
import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from 'redux'


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
