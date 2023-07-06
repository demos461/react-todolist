import React, {useCallback, useEffect} from 'react'
import {useAppSelector} from '../../app/store'
import {FilterValuesType,} from './todolistsSlice'
import {TaskStatuses} from '../../api/todolists-api'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Navigate} from "react-router-dom";
import {selectTasks, selectTodolists} from "./selectors";
import {useActions} from "../../hooks/useActions";
import {selectIsLoggedIn} from '../Auth/selectors';

export const TodolistsList: React.FC = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const {
        fetchTodolistsTC,
        changeTodolistTitleTC,
        changeTodolistFilter,
        removeTodolistTC,
        addTodolistTC,
        removeTaskTC,
        addTaskTC,
        updateTaskTC
    } = useActions()

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        fetchTodolistsTC()
    }, [])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        removeTaskTC({taskId, todolistId})
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        addTaskTC({title, todolistId})

    }, [])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        updateTaskTC({taskId, domainModel: {status}, todolistId})

    }, [])

    const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todolistId: string) {
        updateTaskTC({taskId, domainModel: {title: newTitle}, todolistId})
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        changeTodolistFilter({todolistId, filter: value})
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        removeTodolistTC(id)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        changeTodolistTitleTC({id, title})
    }, [])

    const addTodolist = useCallback((title: string) => {
        addTodolistTC(title)
    }, [])


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
