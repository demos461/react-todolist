import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducers/tasks-reducer';
import {todoListsReducer} from './reducers/todolists-reducer';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;