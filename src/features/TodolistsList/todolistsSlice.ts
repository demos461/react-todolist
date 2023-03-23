import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatus} from '../../app/appSlice'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state.splice(index, 1)
        },
        addTodolist: (state, action: PayloadAction<TodolistType>) => {
            state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
            const todolist = state.find(tl => tl.id === action.payload.todolistId)
            if (todolist) todolist.title = action.payload.title
        }
        ,
        changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) => {
            const todolist = state.find(tl => tl.id === action.payload.todolistId)
            if (todolist) todolist.filter = action.payload.filter
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) => {
            const todolist = state.find(tl => tl.id === action.payload.todolistId)
            if (todolist) todolist.entityStatus = action.payload.status
        },
        setTodolists: (state, action: PayloadAction<TodolistType[]>) => {
            return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
    }
})

export const {
    addTodolist,
    removeTodolist,
    setTodolists,
    changeTodolistTitle,
    changeTodolistFilter,
    changeTodolistEntityStatus
} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolists(res.data))
                dispatch(setAppStatus('succeeded'))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(setAppStatus('loading'))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(changeTodolistEntityStatus({todolistId, status: 'loading'}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolist({id: todolistId}))
                //скажем глобально приложению, что асинхронная операция завершена
                dispatch(setAppStatus('succeeded'))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolist(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitle({todolistId: id, title}))
            })
    }
}

