import {authAPI} from "../api/todolists-api";
import {setIsLoggedIn} from "../features/Login/authSlice";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedIn(true));
            return {isInitialized: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({isInitialized: true})
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({isInitialized: false})
    }
})

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
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isInitialized = action.payload.isInitialized
        })
    }
})

export const {setAppStatus, setAppError} = appSlice.actions

export const appReducer = appSlice.reducer


