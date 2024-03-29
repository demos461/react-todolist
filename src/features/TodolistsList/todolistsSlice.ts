import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {appActions, RequestStatusType} from '../../app/appSlice'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolist', async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await todolistsAPI.getTodolists()
        thunkAPI.dispatch(appActions.setAppStatus('succeeded'))
        return res.data
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await todolistsAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus('succeeded'))
            return {id: todolistId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (title: string, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus('succeeded'))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: { id: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await todolistsAPI.updateTodolist(param.id, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus('succeeded'))
            return {todolistId: param.id, title: param.title}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) => {
            const todolist = state.find(tl => tl.id === action.payload.todolistId)
            if (todolist) todolist.filter = action.payload.filter
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state.splice(index, 1)
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const todolist = state.find(tl => tl.id === action.payload.todolistId)
            if (todolist) todolist.title = action.payload.title
        })
    }
})

export const todolistsActions = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer

export const todolistsAsyncActions = {
    fetchTodolistsTC,
    removeTodolistTC,
    addTodolistTC,
    changeTodolistTitleTC
}

