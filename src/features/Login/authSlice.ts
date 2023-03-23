import {Dispatch} from 'redux'
import {authAPI, LoginDataType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { setAppStatus } from '../../app/appSlice';

type initialStateType = {
    isLoggedIn: boolean
}

const initialState: initialStateType = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const {setIsLoggedIn} = authSlice.actions

export const authReducer = authSlice.reducer


export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.login(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}