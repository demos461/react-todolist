import React, {useCallback} from 'react';
import TodoList, {TaskType} from './TodoList';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from './redux/reducers/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,

} from './redux/reducers/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './redux/store';

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    console.log('app render')
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, TodoListsType[]>((state) => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks)

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }, [dispatch])

    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }, [dispatch])

    const changeTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, taskId, isDone))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))

    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListId, title))
    }, [dispatch])

    const changeFilter = useCallback((todoListId: string, filter: FilterValueType) => {
        dispatch(changeTodoListFilterAC(todoListId, filter))
    }, [dispatch])


    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TODOLISTS
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color="inherit"
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'xl'}>
                <Grid container spacing={3} style={{padding: '20px'}}>

                    {todoLists.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <TodoList
                                    todoListId={tl.id}
                                    filter={tl.filter}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeTaskTitle={changeTaskTitle}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeTaskStatus}
                                />
                            </  Grid>
                        )
                    })}
                    <Grid item>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
