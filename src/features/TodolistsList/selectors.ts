import {RootStateType} from "../../app/store";

export const selectTasks = (state: RootStateType) => state.tasks
export const selectTodolists = (state: RootStateType) => state.todolists