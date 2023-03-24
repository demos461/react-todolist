import {authAPI, LoginDataType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from '../../app/appSlice';

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus('succeeded'))
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return {isLoggedIn: true}
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return {isLoggedIn: true}
    }
})

export const loginTC = createAsyncThunk('auth/login', async (param: LoginDataType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus('succeeded'))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({isLoggedIn: false})
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({isLoggedIn: false})
    }

})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn

        })
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})

export const {setIsLoggedIn} = authSlice.actions

export const authReducer = authSlice.reducer