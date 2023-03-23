import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedIn} from "../features/Login/authSlice";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<RequestStatusType>) => {
            state.status = action.payload
        },
        setAppError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setAppIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload
        }
    }
})

export const {setAppStatus, setAppIsInitialized, setAppError} = appSlice.actions

export const appReducer = appSlice.reducer

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true));
            dispatch(setAppIsInitialized(true))
        } else {
            handleServerAppError(res.data, dispatch);
            dispatch(setAppIsInitialized(true))
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
