import {v1} from 'uuid'
import {FilterValueType, TodoListsType} from '../App'

export enum todoListsActionType {
    ADD_TODOLIST = 'ADD_TODOLIST',
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
}

export const todoListsReducer = (state: TodoListsType[], action: ActionType) : TodoListsType[] => {
    switch (action.type) {
        case todoListsActionType.ADD_TODOLIST: {
            return [...state, {id: action.todoListId, title: action.title, filter: 'all'}]
        }
        case todoListsActionType.REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.todoListId)
        }
        case todoListsActionType.CHANGE_TODOLIST_TITLE: {
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        }
        case todoListsActionType.CHANGE_TODOLIST_FILTER: {
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        }
        default:
            throw new Error(`I don't understand this type`)
    }
}

type ActionType =
    removeTodoListACType |
    addTodoListACType |
    changeTodoListTitleACType |
    changeTodoListFilterACType

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>

export const addTodoListAC = (title: string) => {
    return {
        type: todoListsActionType.ADD_TODOLIST,
        title,
        todoListId: v1()
    } as const

}

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: todoListsActionType.REMOVE_TODOLIST,
        todoListId
    } as const
}

export const changeTodoListTitleAC = (todoListId: string, title: string) => {
    return {
        type: todoListsActionType.CHANGE_TODOLIST_TITLE,
        todoListId,
        title
    } as const
}

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValueType) => {
    return {
        type: todoListsActionType.CHANGE_TODOLIST_FILTER,
        todoListId,
        filter
    } as const
}