import {v1} from 'uuid'
import {TasksType} from '../App';
import {addTodoListACType, removeTodoListACType, todoListsActionType} from './todolists-reducer';


export enum tasksActionType {
    ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
}

export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case tasksActionType.ADD_TASK: {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]
            return stateCopy
        }
        case tasksActionType.REMOVE_TASK: {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        }
        case tasksActionType.CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case tasksActionType.CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        }
        case todoListsActionType.ADD_TODOLIST: {
            return {
                ...state,
                [action.todoListId]: []
            }
        }
        case todoListsActionType.REMOVE_TODOLIST: {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        }

        default:
            throw new Error(`I don't understand this type`)
    }
}

type ActionType =
    addTaskACType |
    removeTaskACType |
    changeTaskTitleACType |
    changeTaskStatusACType |
    addTodoListACType |
    removeTodoListACType

type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: tasksActionType.ADD_TASK,
        todoListId,
        title
    } as const

}

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: tasksActionType.REMOVE_TASK,
        todoListId,
        taskId
    } as const
}

export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {
        type: tasksActionType.CHANGE_TASK_TITLE,
        todoListId,
        taskId,
        title
    } as const
}

export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => {
    return {
        type: tasksActionType.CHANGE_TASK_STATUS,
        todoListId,
        taskId,
        isDone
    } as const
}
